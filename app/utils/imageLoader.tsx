import React, { useState, useEffect } from 'react';

interface ImageLoaderProps {
  imageUrl: string;
  alt: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ imageUrl, alt }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!imageUrl) {
      // Handle the case where imageUrl is null or undefined
      setImageStatus('error');
      return;
    }

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setImageStatus('success');
    };

    image.onerror = () => {
      setImageStatus('error');
    };
  }, [imageUrl]);

  //TODO: add styling to loading component

  return (
    <>

      {imageStatus === 'loading' && <span>Loading flyer...</span>} 
      {imageStatus !== 'loading' && (
        <img
          className="flyerImg"
          src={imageStatus === 'error' ? '/placeholder.png' : imageUrl}
          alt={alt}
        />
      )}
    </>
  );
};

export default ImageLoader;
