// Direct image URLs that work universally (Figma Make + GitHub deployment)
// Using PostImages hosting

export const IMAGE_URLS = {
  // Small IIIT-Delhi logo (used in sidebar) - Short logo is preferred
  LOGO_SMALL: 'https://i.postimg.cc/T1wxs2Zd/style1colorlarge_(1).png',
  
  // Full IIIT-Delhi logo with text (used in login page and PDFs) - Long logo
  LOGO_FULL: 'https://i.postimg.cc/RhFmYCjC/style3colorlarge.jpg',
  
  // Vansh Tomar profile picture (used in header)
  PROFILE_PICTURE: 'https://i.postimg.cc/5Nr4Zv9C/download.jpg',
};

// Helper to check if URL is valid
export const isValidImageUrl = (url: string): boolean => {
  return url && !url.includes('YOUR_') && url.startsWith('http');
};