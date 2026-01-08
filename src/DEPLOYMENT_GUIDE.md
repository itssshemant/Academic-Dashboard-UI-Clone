# GitHub Deployment Guide

## Setting Up Images for GitHub Pages

The application uses 3 images that need to be added to your repository for GitHub deployment:

### Step 1: Save Your Images

Download or save the following images from your source:

1. **Small IIIT-Delhi Logo** - The circular logo badge
2. **Full IIIT-Delhi Logo** - The full logo with text
3. **Profile Picture** - Vansh Tomar's profile picture

### Step 2: Add Images to Repository

Place the images in the `/public/assets/` directory with these exact filenames:

```
/public/assets/
  ├── iiitd-logo-small.png
  ├── iiitd-logo-full.png
  └── vansh-profile.png
```

### Step 3: Image Specifications

**iiitd-logo-small.png:**
- Recommended size: 40x40px to 100x100px (square)
- Used in: Sidebar
- Should be: Small circular IIIT-D logo

**iiitd-logo-full.png:**
- Recommended size: 200x80px to 400x160px (rectangular)
- Used in: Login page, Course Registration PDF, Grades PDF
- Should be: Full IIIT-Delhi logo with institution name

**vansh-profile.png:**
- Recommended size: 100x100px to 200x200px (square)
- Used in: Header profile section
- Should be: Student profile picture

### Step 4: How It Works

The application uses the `ImageWithFallback` component that:

1. **In Figma Make:** Uses `figma:asset` URLs directly
2. **In GitHub Deployment:** Automatically converts to `/assets/` paths
3. **If Images Missing:** Shows styled fallbacks:
   - Logo: Circular "I" badge with "IIIT DELHI" text
   - Profile: "VT" initials badge

### Step 5: Deployment Commands

After adding images to `/public/assets/`:

```bash
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Or if using Vite:

```bash
# Build
vite build

# Preview locally
vite preview
```

### Step 6: Verification

After deployment, verify images load correctly:

1. ✅ Sidebar shows IIIT-D logo
2. ✅ Login page shows full logo
3. ✅ Header shows profile picture
4. ✅ PDF documents show institutional logo

### Fallback Behavior

If any image fails to load (404 error), the app will display:
- **Small Logo:** Indigo circular badge with "I"
- **Full Logo:** Styled "IIIT DELHI" text with badge
- **Profile:** "VT" initials in indigo circle

This ensures the application works perfectly even if images are not added!

---

## Image Paths Summary

| Component | Image Path | Fallback |
|-----------|------------|----------|
| Sidebar | `/assets/iiitd-logo-small.png` | Circular "I" badge |
| Login Page | `/assets/iiitd-logo-full.png` | "IIIT DELHI" text banner |
| Header Profile | `/assets/vansh-profile.png` | "VT" initials |
| Course PDF | `/assets/iiitd-logo-full.png` | "IIIT DELHI" text banner |
| Grades PDF | `/assets/iiitd-logo-full.png` | "IIIT DELHI" text banner |

---

## Troubleshooting

**Images not showing after deployment?**
- Check that images are in `/public/assets/` folder
- Verify filenames match exactly (case-sensitive)
- Clear browser cache and reload
- Check browser console for 404 errors

**Want to use different images?**
- Replace files in `/public/assets/` with same filenames
- Keep recommended dimensions for best results
- Use PNG format for transparency support

**Styled fallbacks showing instead of images?**
- This is normal if images aren't added yet
- Add actual image files to see real logos/photos
- Fallbacks ensure app looks professional regardless
