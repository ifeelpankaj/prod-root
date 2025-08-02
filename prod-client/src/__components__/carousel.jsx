/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { LuChevronLeft, LuChevronRight, LuZoomIn } from 'react-icons/lu';
import { PauseCircleTwoTone, PlaySquareFilled } from '@ant-design/icons';

const Carousel = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isZoomed, setIsZoomed] = useState(false);

    // Helper function to safely get image URL
    const getImageUrl = (image) => {
        if (!image) return '';
        // Handle object with url property (Cloudinary format)
        if (typeof image === 'object' && image.url) return image.url;
        // Handle string URLs
        if (typeof image === 'string') return image;
        // Handle File/Blob objects
        if (image instanceof File || image instanceof Blob) {
            return URL.createObjectURL(image);
        }
        return '';
    };

    // Auto-play functionality
    React.useEffect(() => {
        if (!isAutoPlaying || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    if (!images || images.length === 0) {
        return (
            <div className="cab-carousel">
                <div className="cab-carousel__placeholder">
                    <div className="cab-carousel__placeholder-icon">📷</div>
                    <p className="cab-carousel__placeholder-text">No images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cab-carousel">
            {/* Main Image Display */}
            <div className="cab-carousel__main">
                <div className={`cab-carousel__image-wrapper ${isZoomed ? 'cab-carousel__image-wrapper--zoomed' : ''}`}>
                    <img
                        src={getImageUrl(images[currentIndex])}
                        alt={`Cab image ${currentIndex + 1}`}
                        className="cab-carousel__main-image"
                        onClick={toggleZoom}
                    />

                    {/* Zoom Icon */}
                    <button
                        className="cab-carousel__zoom-btn"
                        onClick={toggleZoom}>
                        <LuZoomIn size={20} />
                    </button>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                className="cab-carousel__nav-btn cab-carousel__nav-btn--prev"
                                onClick={goToPrevious}>
                                <LuChevronLeft size={24} />
                            </button>
                            <button
                                className="cab-carousel__nav-btn cab-carousel__nav-btn--next"
                                onClick={goToNext}>
                                <LuChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>

                {/* Image Counter & Controls */}
                <div className="cab-carousel__controls">
                    <div className="cab-carousel__counter">
                        <span className="cab-carousel__counter-current">{currentIndex + 1}</span>
                        <span className="cab-carousel__counter-divider">/</span>
                        <span className="cab-carousel__counter-total">{images.length}</span>
                    </div>

                    {images.length > 1 && (
                        <button
                            className="cab-carousel__autoplay-btn"
                            onClick={toggleAutoPlay}>
                            {isAutoPlaying ? <PauseCircleTwoTone size={16} /> : <PlaySquareFilled size={16} />}
                            <span className="cab-carousel__autoplay-text">{isAutoPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="cab-carousel__thumbnails">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`cab-carousel__thumbnail ${index === currentIndex ? 'cab-carousel__thumbnail--active' : ''}`}
                            onClick={() => goToSlide(index)}>
                            <img
                                src={getImageUrl(image)}
                                alt={`Thumbnail ${index + 1}`}
                                className="cab-carousel__thumbnail-image"
                            />
                            <div className="cab-carousel__thumbnail-overlay"></div>
                        </button>
                    ))}
                </div>
            )}

            {/* Progress Indicator */}
            {images.length > 1 && isAutoPlaying && (
                <div className="cab-carousel__progress">
                    <div className="cab-carousel__progress-fill"></div>
                </div>
            )}
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File), PropTypes.instanceOf(Blob)]))
};

Carousel.defaultProps = {
    images: []
};

export default Carousel;
