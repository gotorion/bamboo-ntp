// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Users should replace this
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60 * 1000;

// Update time and date
function updateTime() {
    const now = new Date();
    
    // Format time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = dateString;
}

// Fetch image from Unsplash
async function fetchUnsplashImage() {
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
        
        return {
            imageUrl: data.urls.regular,
            photographer: data.user.name,
            photographerLink: data.user.links.html,
            timestamp: Date.now()
        };
    } catch (error) {
        console.error('Error fetching Unsplash image:', error);
        return null;
    }
}

// Get cached image or fetch new one
async function getImage() {
    // Try to get cached image from storage
    const result = await chrome.storage.local.get(['cachedImage']);
    
    if (result.cachedImage) {
        const cached = result.cachedImage;
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - cached.timestamp < CACHE_DURATION) {
            return cached;
        }
    }
    
    // Fetch new image
    const imageData = await fetchUnsplashImage();
    
    if (imageData) {
        // Cache the new image
        await chrome.storage.local.set({ cachedImage: imageData });
        return imageData;
    }
    
    // If fetch failed but we have cached data, use it anyway
    if (result.cachedImage) {
        return result.cachedImage;
    }
    
    // Return fallback
    return getFallbackImage();
}

// Fallback image (using Unsplash Source as fallback)
function getFallbackImage() {
    return {
        imageUrl: 'https://source.unsplash.com/random/1920x1080/?nature',
        photographer: 'Unsplash',
        photographerLink: 'https://unsplash.com',
        timestamp: Date.now()
    };
}

// Display the image
function displayImage(imageData) {
    const img = document.getElementById('background-image');
    const photographerName = document.getElementById('photographer-name');
    const photographerLink = document.getElementById('photographer-link');
    
    img.classList.add('loading');
    
    img.onload = () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
    };
    
    img.src = imageData.imageUrl;
    photographerName.textContent = imageData.photographer;
    photographerLink.href = imageData.photographerLink + '?utm_source=bamboo-ntp&utm_medium=referral';
}

// Initialize
async function init() {
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Load and display image
    const imageData = await getImage();
    displayImage(imageData);
}

// Start the app
init();
