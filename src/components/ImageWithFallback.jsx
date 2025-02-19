import React, { useState } from 'react';
const ImageWithFallback = ({ src, alt, fallbackSrc }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(fallbackSrc);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default ImageWithFallback;