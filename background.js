// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';

// Number of images to download per day
const IMAGES_PER_DAY = 10;
const ALARM_NAME = 'daily-image-download';

// Download and cache a single image
async function downloadAndCacheImage() {
    try {
        const response = await fetch(
            `${UNSPLASH_API_URL}?orientation=landscape&query=nature`,
            {
                headers: {
                    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch from Unsplash');
        }
        
        const data = await response.json();
        
        // Download the actual image and convert to base64
        // Use raw URL with 4K dimensions (3840x2160) to ensure at least 4K resolution
        const imageUrl = new URL(data.urls.raw);
        imageUrl.searchParams.set('w', '3840');
        imageUrl.searchParams.set('h', '2160');
        imageUrl.searchParams.set('fit', 'crop');
        const imageResponse = await fetch(imageUrl.toString());
        const blob = await imageResponse.blob();
        const base64 = await blobToBase64(blob);
        
        return {
            base64Data: base64,
            photographer: data.user.name,
            photographerLink: data.user.links.html,
            timestamp: Date.now(),
            id: data.id
        };
    } catch (error) {
        console.error('Error downloading image:', error);
        return null;
    }
}

// Convert blob to base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Download multiple images and update cache
async function downloadDailyImages() {
    console.log('Starting daily image download...');
    
    const images = [];
    
    // Download IMAGES_PER_DAY images
    for (let i = 0; i < IMAGES_PER_DAY; i++) {
        const image = await downloadAndCacheImage();
        if (image) {
            images.push(image);
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }
    
    if (images.length > 0) {
        // Store the new images
        await chrome.storage.local.set({
            cachedImages: images,
            lastDownloadDate: new Date().toDateString(),
            currentImageIndex: 0
        });
        console.log(`Downloaded and cached ${images.length} images`);
    }
}

// Check if we need to download images today
async function checkAndDownloadImages() {
    const result = await chrome.storage.local.get(['lastDownloadDate', 'cachedImages']);
    const today = new Date().toDateString();
    
    // Download if we haven't downloaded today or if there are no cached images
    if (result.lastDownloadDate !== today || !result.cachedImages || result.cachedImages.length === 0) {
        await downloadDailyImages();
    }
}

// Set up daily alarm
async function setupDailyAlarm() {
    // Clear any existing alarm
    await chrome.alarms.clear(ALARM_NAME);
    
    // Create a new alarm that fires every 24 hours
    await chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: 1, // First check in 1 minute
        periodInMinutes: 24 * 60 // Then every 24 hours
    });
}

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        checkAndDownloadImages();
    }
});

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Extension installed/updated');
    await setupDailyAlarm();
    await checkAndDownloadImages();
});

// Also check on startup
chrome.runtime.onStartup.addListener(async () => {
    console.log('Browser started');
    await checkAndDownloadImages();
});

// Check immediately when service worker starts
checkAndDownloadImages();
