# Chrome Extension Preview

## What this extension does:

1. **Replaces Chrome's New Tab Page**: When you open a new tab in Chrome, instead of the default page, you'll see a beautiful full-screen image from Unsplash.

2. **Features**:
   - Full-screen high-quality images from Unsplash
   - Real-time clock display (HH:MM format)
   - Current date display (e.g., "Wednesday, February 12, 2026")
   - Photo credits with clickable links to the photographer's Unsplash profile
   - Smooth fade-in animations
   - Smart caching (images refresh every hour to reduce API calls)

3. **Visual Design**:
   - Clean, minimalist interface
   - Large centered clock with current time
   - Date displayed below the clock
   - Semi-transparent dark overlay for better text readability
   - Photo attribution in the bottom-left corner
   - All text has shadows for visibility on any background

## How to test:

### Method 1: Load in Chrome as Extension
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select this directory
6. Open a new tab to see the extension in action

### Method 2: Open HTML directly
Simply open `newtab.html` in any web browser to see the layout and design.

**Note**: The Unsplash API functionality requires a valid API key. Without it, the extension uses Unsplash Source as a fallback.

## Files:
- `manifest.json` - Chrome extension configuration
- `newtab.html` - The new tab page structure
- `styles.css` - All styling and animations
- `script.js` - Image fetching, caching, and time display logic
- `README.md` - Installation and usage instructions
