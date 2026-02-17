# Bamboo New Tab Page

A beautiful Chrome extension that replaces your default new tab page with stunning pictures from Unsplash.

## Features

- 🖼️ Beautiful high-quality images from Unsplash
- 🕐 Clean clock and date display
- 💾 Smart image caching (downloads 5-10 images daily and stores them locally)
- 🔄 Image rotation (each new tab shows a different cached image)
- 🚀 Faster load times (images loaded from local cache, not internet)
- 📸 Photo credits with links to photographers
- 🎨 Elegant, minimalist design

## Installation

### Option 1: Load as Unpacked Extension (Development)

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `bamboo-ntp` directory

### Option 2: Using Unsplash API (Recommended for full functionality)

To use the Unsplash API with your own API key:

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a free account and register a new application
3. Copy your Access Key
4. Open `background.js` in this repository
5. Replace `YOUR_ACCESS_KEY_HERE` with your actual Unsplash Access Key
6. Follow the installation steps above

**Note:** Without an API key, the extension will use Lorem Picsum as a fallback, which still provides beautiful images but with limited functionality.

## Usage

Once installed, simply open a new tab in Chrome. You'll see:
- A beautiful background image from Unsplash (loaded from local cache)
- Current time and date
- Photo credits at the bottom left

The extension automatically:
- Updates the time every second
- Downloads 7 new images daily (between 5-10 as optimized)
- Stores images locally as base64 data for offline access
- Rotates through cached images with each new tab
- Refreshes the image cache once per day

## Configuration

You can customize the extension by modifying `background.js`:

- **IMAGES_PER_DAY**: Change how many images to download daily (default: 7, recommended: 5-10)
- **Image query**: Modify the `query` parameter in the API call (default: 'nature')
- **Orientation**: Change from 'landscape' to 'portrait' or 'squarish'

## File Structure

```
bamboo-ntp/
├── manifest.json      # Chrome extension configuration
├── background.js      # Background service worker for daily downloads
├── newtab.html       # New tab page HTML
├── styles.css        # Styling for the new tab page
├── script.js         # Main JavaScript logic
└── README.md         # This file
```

## Development

To make changes to the extension:

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the reload icon on the Bamboo New Tab card
4. Open a new tab to see your changes

## How It Works

### Daily Image Download
- The extension uses a background service worker that runs independently
- On first install and browser startup, it checks if images need to be downloaded
- Every 24 hours, it automatically downloads 7 new images from Unsplash
- Images are converted to base64 and stored in Chrome's local storage
- This ensures images are available offline and load instantly

### Image Rotation
- Each time you open a new tab, the extension cycles to the next cached image
- With 7 images cached, you'll see a different image for each new tab
- The rotation loops back to the first image after showing all 7

### Benefits
- ⚡ **Faster Load Times**: Images load from local cache, not the internet
- 🌐 **Offline Support**: Works even without internet connection (after initial download)
- 📊 **Reduced API Calls**: Only 7 API calls per day instead of per-hour
- 🔄 **Variety**: Different image with each new tab throughout the day

## Privacy

This extension:
- Downloads images from Unsplash once per day
- Stores images locally using Chrome's storage API
- Does not collect or transmit any personal data
- Does not track your browsing history

## Credits

- Images provided by [Unsplash](https://unsplash.com)
- Extension created for the bamboo-ntp project

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or feature requests, please create an issue on the GitHub repository.
