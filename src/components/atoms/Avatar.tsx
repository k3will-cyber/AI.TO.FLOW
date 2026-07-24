import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  name?: string; // For generating initials
  className?: string;
  shape?: 'circle' | 'square';
}

const Avatar = ({
  src,
  alt = '',
  size = 'md',
  name,
  className = '',
  shape = 'circle'
}: AvatarProps) => {
  const sizeMap = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  // Generate initials from name if no src provided
  const getInitials = (nameStr: string): string => {
    return nameStr
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${sizeMap[size]} ${shapeClass} flex items-center justify-center bg-neutral/20 text-text-muted font-medium ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <span>NA</span>
      )}
    </div>
  );
};

export default Avatar;