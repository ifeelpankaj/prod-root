import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { extractNumericValue, priceCalculator } from '../../__utils__/user.utils';
import Skeleton from 'react-loading-skeleton';

const CabCard = ({ cab = {}, distance, isLoading }) => {
    const { _id, modelName, photos, rate } = cab;
    const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

    // Calculate price based on distance and rate

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    const barVariants = {
        hidden: { width: 0 },
        visible: (percentage) => ({
            width: percentage,
            transition: { duration: 1, delay: 0.3, ease: 'easeOut' }
        })
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        })
    };

    if (isLoading && !distance) {
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
    const { breakdown = {}, totalHours = 0, nightCharge = 0, tollTax = 0, totalCharges, distance: distance_data } = distance || {};
    const distanceInKM = extractNumericValue(distance_data);

    const priceTotal = priceCalculator(distanceInKM, rate, totalCharges);

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
                <p className="cabs_price">
                    <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9rem', marginRight: '6px' }}>
                        ₹ {priceTotal > 0 ? Math.round(priceTotal * 1.2) : 'N/A'}
                    </span>
                    ₹ {priceTotal > 0 ? priceTotal : 'N/A'}
                </p>

                <p className="cabs_description">Experience luxury and comfort with our {modelName}. Perfect for your journey 💫 ...</p>
                <motion.section
                    className="breakdown_card"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.div
                        className="breakdown_section"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}>
                        <h3>Travel Time Distribution</h3>

                        <div className="percentage_item">
                            <div className="percentage_header">
                                <span className="label">Day Travel</span>
                                <span className="value">{breakdown.dayPercentage}</span>
                            </div>
                            <div className="progress_bar">
                                <motion.div
                                    className="progress_fill day"
                                    variants={barVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={breakdown.dayPercentage}
                                />
                            </div>
                        </div>

                        <div className="percentage_item">
                            <div className="percentage_header">
                                <span className="label">Night Travel</span>
                                <span className="value">{breakdown.nightPercentage}</span>
                            </div>
                            <div className="progress_bar">
                                <motion.div
                                    className="progress_fill night"
                                    variants={barVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={breakdown.nightPercentage}
                                />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="breakdown_section"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}>
                        <h3>Trip Details</h3>
                        <div className="details_grid">
                            <div className="detail_item">
                                <span className="detail_label">Included Km</span>
                                <span className="detail_value">{distanceInKM ? distanceInKM : 0} Km</span>
                            </div>
                            <div className="detail_item">
                                <span className="detail_label">Duration</span>
                                <span className="detail_value">{Math.round(totalHours)} hrs</span>
                            </div>

                            <div className="detail_item">
                                <span className="detail_label">Fare</span>
                                <span className="detail_value">{rate}/ Km</span>
                            </div>
                            <div className="detail_item">
                                <span className="detail_label">GST</span>
                                <span className="detail_value">₹{tollTax}/Included</span>
                            </div>
                            <div className="detail_item">
                                <span className="detail_label">Night Charge</span>
                                <span className="detail_value">₹{nightCharge}/Included</span>
                            </div>
                        </div>
                    </motion.div>
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
                </motion.section>
            </motion.div>
            {/* Day night distribution */}

            {/* Day/Night Distribution */}
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
    distance: PropTypes.shape({
        breakdown: PropTypes.shape({
            dayPercentage: PropTypes.string.isRequired,
            nightPercentage: PropTypes.string.isRequired
        }).isRequired,
        distance: PropTypes.string.isRequired,
        totalHours: PropTypes.number.isRequired,
        nightCharge: PropTypes.number.isRequired,
        tollTax: PropTypes.number.isRequired,
        totalCharges: PropTypes.number.isRequired
    }),
    isLoading: PropTypes.bool.isRequired
};

export default CabCard;
