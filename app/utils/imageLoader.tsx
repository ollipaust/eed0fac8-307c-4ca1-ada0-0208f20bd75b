import React, { useState, useEffect } from 'react';

interface ImageLoaderProps {
  imageUrl: string;
  alt: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ imageUrl, alt }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setImageStatus('success');
    };

    image.onerror = () => {
      setImageStatus('error');
    };
  }, [imageUrl]);

  return (
    <>
      {imageStatus === 'loading' && <p>Loading flyer...</p>}
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
