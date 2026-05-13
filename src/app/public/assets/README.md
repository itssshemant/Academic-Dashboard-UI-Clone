# Assets Directory

This directory contains all static assets for the IIIT-Delhi ERP application.

## Required Images

Please add the following images to this directory for the application to work correctly in GitHub deployment:

1. **iiitd-logo-small.png** - Small IIIT-Delhi circular logo (used in sidebar)
   - Recommended size: 40x40px or similar square dimensions
   
2. **iiitd-logo-full.png** - Full IIIT-Delhi logo with text (used in login page and PDFs)
   - Recommended size: 200x80px or similar rectangular dimensions
   
3. **vansh-profile.png** - Profile picture for Vansh Tomar (used in header)
   - Recommended size: 100x100px or similar square dimensions

## How to Add Images

1. Download/save your images
2. Rename them according to the filenames above
3. Place them in the `/public/assets/` directory
4. The application will automatically use these images

## Fallback Behavior

If images are not found, the application will display styled fallbacks:
- Logo: Styled "IIIT-D" text badge
- Profile: Initials badge with "VT"
