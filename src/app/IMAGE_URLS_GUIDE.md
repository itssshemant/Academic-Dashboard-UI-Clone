# Image URLs Setup Guide

## ✅ Simple Universal Solution - Using Direct Image URLs

Instead of uploading files, you can use direct image URLs that work **everywhere** (Figma Make + GitHub + any deployment).

## How to Set Up

### Step 1: Host Your Images

Upload your 3 images to any of these services:

**Free Options:**
- **Imgur** - https://imgur.com (easiest, no account needed)
- **GitHub** - Upload to any public GitHub repo
- **Google Drive** - Share with "Anyone with link" access
- **Cloudinary** - Free CDN service
- **imgbb** - https://imgbb.com

### Step 2: Get Direct Image URLs

Make sure you get the **direct image URL** (ends with .png, .jpg, etc.):

**✅ Correct URL format:**
```
https://i.imgur.com/abc123.png
https://raw.githubusercontent.com/user/repo/main/image.png
https://res.cloudinary.com/demo/image/upload/sample.png
```

**❌ Wrong URL format (webpage, not image):**
```
https://imgur.com/abc123  (missing direct link)
https://drive.google.com/file/d/xyz/view  (not direct link)
```

### Step 3: Update `/utils/imageUrls.ts`

Replace the placeholder URLs with your actual image URLs:

```typescript
export const IMAGE_URLS = {
  // Small IIIT-Delhi logo (used in sidebar)
  LOGO_SMALL: 'https://i.imgur.com/YOUR_SMALL_LOGO.png',
  
  // Full IIIT-Delhi logo with text (used in login page and PDFs)
  LOGO_FULL: 'https://i.imgur.com/YOUR_FULL_LOGO.png',
  
  // Vansh Tomar profile picture (used in header)
  PROFILE_PICTURE: 'https://i.imgur.com/YOUR_PROFILE.png',
};
```

### Step 4: Done! 🎉

That's it! The images will now work:
- ✅ In Figma Make
- ✅ On GitHub Pages
- ✅ On any hosting platform
- ✅ No build step needed
- ✅ No file uploads required

## Quick Start with Imgur (Recommended)

1. Go to https://imgur.com
2. Click "New post"
3. Upload your 3 images
4. Right-click each image → "Copy image address"
5. Paste URLs into `/utils/imageUrls.ts`

## Images You Need

### 1. Small IIIT-Delhi Logo (`LOGO_SMALL`)
- **Used in:** Sidebar
- **Size:** 40x40px to 100x100px (square)
- **Format:** PNG with transparency preferred

### 2. Full IIIT-Delhi Logo (`LOGO_FULL`)
- **Used in:** Login page, Course Registration PDF, Grades PDF
- **Size:** 200x80px to 400x160px (rectangular)
- **Format:** PNG with transparency preferred

### 3. Profile Picture (`PROFILE_PICTURE`)
- **Used in:** Header profile section
- **Size:** 100x100px to 200x200px (square)
- **Format:** PNG or JPG

## Fallback System

If URLs are not set or images fail to load:
- **Small Logo** → Shows indigo "I" badge
- **Full Logo** → Shows "IIIT DELHI" text banner
- **Profile** → Shows "VT" initials badge

App looks professional even without images!

## Example with Real URLs

```typescript
// Example using Imgur
export const IMAGE_URLS = {
  LOGO_SMALL: 'https://i.imgur.com/k8Xr2Fm.png',
  LOGO_FULL: 'https://i.imgur.com/9LzQvHj.png',
  PROFILE_PICTURE: 'https://i.imgur.com/AbC123d.jpg',
};
```

## Testing

After setting URLs, test that images load:

1. Check sidebar - small logo should appear
2. Check login page - full logo should appear
3. Check header - profile picture should appear
4. Generate PDFs - logo should appear in documents

## Troubleshooting

**Images not loading?**
- Ensure URLs are direct image links (end with .png, .jpg)
- Check that URLs are publicly accessible (no login required)
- Test URLs in browser address bar - should show image directly
- Try using Imgur - it's the most reliable for this use case

**CORS errors?**
- Use Imgur or GitHub raw URLs - they have proper CORS headers
- Avoid some Google Drive links - they may have CORS restrictions

**Want to change images later?**
- Just update the URLs in `/utils/imageUrls.ts`
- No rebuild or redeployment needed (for hot-reload environments)
- For static deployments, rebuild after changing URLs

---

## Why This Method is Better

✅ **Universal** - Works everywhere  
✅ **No uploads** - Just paste URLs  
✅ **Easy updates** - Change URLs anytime  
✅ **No file management** - No need to track files  
✅ **CDN performance** - Fast loading from image hosts  
✅ **Simple deployment** - One less step to worry about
