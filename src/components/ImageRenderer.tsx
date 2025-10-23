import React from 'react';

interface ImageRendererProps {
  src: string;
  altText: string;
  width?: number;
  height?: number;
}

const ImageRenderer: React.FC<ImageRendererProps> = ({ src, altText, width, height }) => {
  return (
    <img
      src={src}
      alt={altText}
      width={width}
      height={height}
      style={{ maxWidth: '100%', height: 'auto' }} // Basic styling for responsiveness
    />
  );
};

export default ImageRenderer;
