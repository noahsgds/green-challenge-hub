
import React from 'react';

interface MascotProps {
  pose?: 'default' | 'bamboo' | 'victory' | 'sitting' | 'log' | 'reading' | 'excited' | 'love';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RedPandaMascot: React.FC<MascotProps> = ({ pose = 'default', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  // Mapper les différentes poses aux images
  const mascotImages = {
    default: '/lovable-uploads/e02389bc-bde8-49c6-b891-f4df220927b1.png',
    bamboo: '/lovable-uploads/78c6620d-c060-4e5c-8b28-b07e2ac102bd.png',
    victory: '/lovable-uploads/f88dbf3f-888b-4064-b302-aee5cb3ddf34.png',
    sitting: '/lovable-uploads/725c3004-38fd-4991-9379-2b3d56c63f10.png',
    log: '/lovable-uploads/f48b8050-13a8-478d-95a9-5643ff64b718.png',
    reading: '/lovable-uploads/979e0018-c69d-4449-a257-cca1b62f250f.png',
    excited: '/lovable-uploads/d6071d7f-1986-483e-94e0-db5c04b289aa.png',
    love: '/lovable-uploads/cf65b73f-c0cc-419c-b32a-e2251b5b68b0.png'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <img 
        src={mascotImages[pose]} 
        alt={`Panda roux en pose ${pose}`} 
        className="w-full h-full object-contain drop-shadow-md animate-float"
      />
    </div>
  );
};

export default RedPandaMascot;
