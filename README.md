# Bamboo New Tab Page

A beautiful Chrome extension that replaces your default new tab page with stunning pictures from Unsplash.

## Features

- 🖼️ Beautiful high-quality images from Unsplash
- 🕐 Clean clock and date display
- 💾 Smart caching (images refresh every hour)
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
4. Open `script.js` in this repository
5. Replace `YOUR_ACCESS_KEY_HERE` with your actual Unsplash Access Key
6. Follow the installation steps above

**Note:** Without an API key, the extension will use Unsplash Source as a fallback, which still provides beautiful images but with limited functionality.

## Usage

Once installed, simply open a new tab in Chrome. You'll see:
- A beautiful background image from Unsplash
- Current time and date
- Photo credits at the bottom left

The extension automatically:
- Updates the time every second
- Caches images for 1 hour to minimize API calls
- Fetches a new random image when the cache expires

## Configuration

You can customize the extension by modifying `script.js`:

- **CACHE_DURATION**: Change how often images refresh (default: 1 hour)
- **Image query**: Modify the `query` parameter in the API call (default: 'nature')
- **Orientation**: Change from 'landscape' to 'portrait' or 'squarish'

## File Structure

```
bamboo-ntp/
├── manifest.json      # Chrome extension configuration
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

## Privacy

This extension:
- Only requests images from Unsplash
- Stores image URLs locally using Chrome's storage API
- Does not collect or transmit any personal data
- Does not track your browsing history

## Credits

- Images provided by [Unsplash](https://unsplash.com)
- Extension created for the bamboo-ntp project

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or feature requests, please create an issue on the GitHub repository.
