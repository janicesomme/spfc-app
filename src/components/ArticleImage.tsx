import React, { useState } from 'react';

interface ArticleImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  className = ""
}) => {
  const [imageSrc, setImageSrc] = useState(
    src || 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png'
  );
  
  const handleImageError = () => {
    setImageSrc('https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png');
  };
  
  return (
    <img 
      src={imageSrc}
      alt={alt}
      onError={handleImageError}
      className={`w-full h-full object-cover ${className}`}
      style={{ minHeight: '192px', backgroundColor: '#f3f4f6' }}
    />
  );
};