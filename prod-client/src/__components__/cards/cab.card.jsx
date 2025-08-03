import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { priceCalculator } from '../../__utils__/user.utils';
import Skeleton from 'react-loading-skeleton';

const CabCard = ({ cab = {}, distance, isLoading }) => {
    const { _id, modelName, photos, rate } = cab;
    const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

    // Calculate price based on distance and rate
    const priceTotal = priceCalculator(distance, rate);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const cardVariants = {
        hidden: { opacity: 0, rotateY: -90 },
        visible: { opacity: 1, rotateY: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } },
        hover: { scale: 1.03, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', transition: { duration: 0.3 } }
    };

    const imageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    // Skeleton inline styles
    const skeletonStyles = {
        image: {
            height: '200px',
            borderRadius: '8px'
        },
        title: {
            height: '28px',
            marginBottom: '12px',
            borderRadius: '4px'
        },
        price: {
            height: '24px',
            width: '120px',
            marginBottom: '16px',
            borderRadius: '4px'
        },
        description: {
            height: '16px',
            marginBottom: '8px',
            borderRadius: '4px'
        },
        feature: {
            height: '20px',
            width: '80px',
            marginRight: '12px',
            borderRadius: '4px',
            display: 'inline-block'
        },
        button: {
            height: '40px',
            borderRadius: '6px',
            marginTop: '16px'
        }
    };

    if (isLoading) {
        return (
            <motion.section
                className="cabs_card"
                variants={cardVariants}
                initial="hidden"
                animate="visible">
                <div className="cabs_carousel">
                    <Skeleton style={skeletonStyles.image} />
                </div>
                <motion.div
                    className="cabs_info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <Skeleton style={skeletonStyles.title} />

                    <Skeleton style={skeletonStyles.price} />

                    <div style={{ marginBottom: '16px' }}>
                        <Skeleton style={skeletonStyles.description} />
                        <Skeleton style={{ ...skeletonStyles.description, width: '70%' }} />
                    </div>

                    <div
                        className="cabs_features"
                        style={{ marginBottom: '16px' }}>
                        <Skeleton style={skeletonStyles.feature} />
                        <Skeleton style={skeletonStyles.feature} />
                        <Skeleton style={skeletonStyles.feature} />
                        <Skeleton style={skeletonStyles.feature} />
                    </div>

                    <Skeleton style={skeletonStyles.button} />
                </motion.div>
            </motion.section>
        );
    }

    return (
        <motion.section
            className="cabs_card"
            variants={cardVariants}
            initial="hidden"
            animate="visible">
            <div className="cabs_carousel">
                <AnimatePresence
                    initial={false}
                    custom={currentPhotoIndex}>
                    <motion.img
                        key={currentPhotoIndex}
                        src={photos[currentPhotoIndex]?.url}
                        custom={currentPhotoIndex}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    />
                </AnimatePresence>
                <button
                    className="cabs_carousel_button prev"
                    onClick={prevPhoto}>
                    <FaChevronLeft />
                </button>
                <button
                    className="cabs_carousel_button next"
                    onClick={nextPhoto}>
                    <FaChevronRight />
                </button>
            </div>
            <motion.div
                className="cabs_info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}>
                <h2>{modelName}</h2>
                <p className="cabs_price">₹ {priceTotal > 0 ? priceTotal : 'N/A'}</p>

                <p className="cabs_description">Experience luxury and comfort with our {modelName}. Perfect for your journey 💫 ...</p>
                <div className="cabs_features">
                    <span>
                        Included Km <p>{distance} Km</p>
                    </span>
                    <span>
                        Extra fare/Km <p>₹ {rate}/Km</p>
                    </span>
                    <span>
                        Fuel Charges <p>Included</p>
                    </span>

                    <span>
                        Night Charge <p>Included</p>
                    </span>
                    <span>
                        Driver Charge <p>Included</p>
                    </span>
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {priceTotal > 0 ? (
                        <Link
                            className="cabs_book_button"
                            to={`/preview-booking/${_id}`}>
                            Book Now
                        </Link>
                    ) : (
                        <Link
                            className="cabs_book_button"
                            to={'/'}>
                            Not Available
                        </Link>
                    )}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};
// Prop Types
CabCard.propTypes = {
    cab: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
        modelName: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ).isRequired,
        type: PropTypes.string,
        rate: PropTypes.number.isRequired
    }).isRequired,
    distance: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default CabCard;
