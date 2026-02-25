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

// Get image from local cache
async function getNextImageFromCache() {
    const result = await chrome.storage.local.get(['cachedImages']);
    
    if (!result.cachedImages || result.cachedImages.length === 0) {
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * result.cachedImages.length);
    return result.cachedImages[randomIndex];
}

// Fallback image (using Picsum as fallback since Unsplash Source is deprecated)
// Using 4K resolution (3840x2160) to ensure at least 4K quality
function getFallbackImage() {
    return {
        imageUrl: 'https://picsum.photos/3840/2160',
        photographer: 'Lorem Picsum',
        photographerLink: 'https://picsum.photos',
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
    
    // Use base64Data if available, otherwise use imageUrl for fallback
    img.src = imageData.base64Data || imageData.imageUrl;
    photographerName.textContent = imageData.photographer;
    photographerLink.href = imageData.photographerLink + '?utm_source=bamboo-ntp&utm_medium=referral';
}

// Initialize
async function init() {
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Load and display image
    const imageData = (await getNextImageFromCache()) || getFallbackImage();
    displayImage(imageData);
}

// Start the app
init();
