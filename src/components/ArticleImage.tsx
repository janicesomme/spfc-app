import React from 'react';

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
  // Use working Manchester United official asset
  const manUtdImage = "https://assets.manutd.com/AssetPicker/images/0/0/16/126/817809/mufc-crest1606231460741.png";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If even the official image fails, show red background with MUFC text
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    if (target.parentElement) {
      target.parentElement.innerHTML = '<div class="w-full h-48 bg-red-600 flex items-center justify-center text-white font-bold text-xl rounded-lg">MUFC</div>';
    }
  };
  
  return (
    <img 
      src={manUtdImage}
      alt="Manchester United"
      className={`w-full h-48 object-contain bg-red-600 rounded-lg p-4 ${className}`}
      style={{ 
        minHeight: '192px',
        backgroundColor: '#DC2626', // Man Utd red background
        objectFit: 'contain'
      }}
      onError={handleImageError}
    />
  );
};