import React, { useState, useEffect } from 'react'
import { IMAGE_URLS, isValidImageUrl } from '../../utils/imageUrls'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Custom fallbacks for known image types
const getCustomFallback = (src?: string, alt?: string) => {
  if (!src) return null;
  
  // IIIT-Delhi small logo fallback
  if (src.includes('d54fdb9c2fb0c7d2dbec35ce6b388ea5a264634f') || src.includes('logo-small') || src === 'LOGO_SMALL') {
    return (
      <div className="flex items-center justify-center w-10 h-10 bg-indigo-700 text-white rounded-full font-bold text-lg">
        I
      </div>
    );
  }
  
  // IIIT-Delhi full logo fallback
  if (src.includes('97c2a527215d4815f31fb2d6d63560240c905711') || src.includes('logo-full') || src === 'LOGO_FULL') {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
            I
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg">IIIT DELHI</div>
            <div className="text-xs text-gray-600">Indraprastha Institute of Information Technology</div>
          </div>
        </div>
      </div>
    );
  }
  
  // Profile picture fallback (Vansh Tomar)
  if (src.includes('528e1afbb8972e8e2e7979ec1531b2e6d548480f') || src.includes('profile') || alt?.includes('Vansh') || src === 'PROFILE_PICTURE') {
    return (
      <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-semibold text-sm">
        VT
      </div>
    );
  }
  
  return null;
};

// Map image identifiers to their URLs
const getImageUrl = (identifier: string): string => {
  switch (identifier) {
    case 'LOGO_SMALL':
      return isValidImageUrl(IMAGE_URLS.LOGO_SMALL) ? IMAGE_URLS.LOGO_SMALL : identifier;
    case 'LOGO_FULL':
      return isValidImageUrl(IMAGE_URLS.LOGO_FULL) ? IMAGE_URLS.LOGO_FULL : identifier;
    case 'PROFILE_PICTURE':
      return isValidImageUrl(IMAGE_URLS.PROFILE_PICTURE) ? IMAGE_URLS.PROFILE_PICTURE : identifier;
    default:
      return identifier;
  }
};

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | undefined>(props.src)

  useEffect(() => {
    let finalSrc = props.src;
    
    // Handle image identifiers (LOGO_SMALL, LOGO_FULL, PROFILE_PICTURE)
    if (finalSrc && ['LOGO_SMALL', 'LOGO_FULL', 'PROFILE_PICTURE'].includes(finalSrc)) {
      finalSrc = getImageUrl(finalSrc);
    }
    // Convert figma:asset URLs to public asset paths for GitHub deployment
    else if (finalSrc?.startsWith('figma:asset/')) {
      const assetHash = finalSrc.replace('figma:asset/', '');
      
      // Map known asset hashes to their URL identifiers
      const assetMap: Record<string, string> = {
        'd54fdb9c2fb0c7d2dbec35ce6b388ea5a264634f.png': 'LOGO_SMALL',
        '97c2a527215d4815f31fb2d6d63560240c905711.png': 'LOGO_FULL',
        '528e1afbb8972e8e2e7979ec1531b2e6d548480f.png': 'PROFILE_PICTURE',
      };
      
      const identifier = assetMap[assetHash];
      if (identifier) {
        finalSrc = getImageUrl(identifier);
      }
    }
    
    setImageSrc(finalSrc);
  }, [props.src]);

  const handleError = () => {
    // If URL fails, try figma:asset scheme (works in Figma Make)
    if (imageSrc !== props.src && props.src?.startsWith('figma:asset/')) {
      setImageSrc(props.src);
    } else {
      setDidError(true);
    }
  }

  const { src, alt, style, className, ...rest } = props
  
  // Check for custom fallback first
  const customFallback = getCustomFallback(imageSrc || src, alt);
  
  if (didError && customFallback) {
    return <div className={className} style={style}>{customFallback}</div>;
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={imageSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}