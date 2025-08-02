import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { updateFormField } from '../../__redux__/slice/info.slice';
import { isGoogleMapsLoaded, loadGoogleMaps } from '../../__scripts__/map.script'; // Updated import
import { FaCalendarAlt, FaCarAlt, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

// ... (all your existing variants remain the same)
const containerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.03
        }
    }
};

const formContainerVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.03
        }
    }
};

const titleVariants = {
    hidden: {
        opacity: 0,
        y: -15,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
};

const toggleVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        x: -10
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            duration: 0.25,
            ease: 'easeOut'
        }
    }
};

const inputVariants = {
    hidden: {
        opacity: 0,
        x: -15,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: 'easeOut'
        }
    },
    hover: {
        scale: 1.01,
        transition: {
            duration: 0.12,
            ease: 'easeOut'
        }
    },
    focus: {
        scale: 1.01,
        y: -1,
        transition: {
            duration: 0.12,
            ease: 'easeOut'
        }
    }
};

const buttonVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 180, damping: 20 }
    },
    hover: {
        scale: 1.03,
        y: -2,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.15, ease: 'easeOut' }
    },
    tap: {
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1, ease: 'easeInOut' }
    }
};

const iconVariants = {
    hidden: {
        opacity: 0,
        rotate: -90,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    },
    hover: {
        rotate: 5,
        scale: 1.05,
        transition: {
            duration: 0.1,
            ease: 'easeOut'
        }
    }
};

const PassengerHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.info);
    const [tripType, setTripType] = useState('OneWay');
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const containerRef = useRef(null);

    // Refs for autocomplete instances
    const fromAutocompleteRef = useRef(null);
    const toAutocompleteRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const formScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const formOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

    const toggleTripType = () => {
        const newTripType = tripType === 'OneWay' ? 'RoundTrip' : 'OneWay';
        setTripType(newTripType);
        dispatch(updateFormField({ field: 'cabType', value: newTripType }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate loading for better UX
        setTimeout(() => {
            setIsLoading(false);
            navigate('/display-cabs');
        }, 800);
    };

    const handleInputChange = (field) => (event) => {
        dispatch(updateFormField({ field, value: event.target.value }));
    };

    const handleDateChange = (field) => (date) => {
        const dateString = date ? date.toISOString() : null;
        dispatch(updateFormField({ field, value: dateString }));
    };

    const handleInputFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleInputBlur = () => {
        setFocusedInput(null);
    };

    // Improved Google Maps autocomplete initialization
    React.useEffect(() => {
        let isMounted = true;

        const handlePlaceSelect = (autocomplete, field) => {
            const place = autocomplete.getPlace();
            if (place.formatted_address && isMounted) {
                dispatch(updateFormField({ field, value: place.formatted_address }));
            }
        };

        const initAutocomplete = async () => {
            try {
                // Ensure Google Maps is loaded
                if (!isGoogleMapsLoaded()) {
                    await loadGoogleMaps();
                }

                // Check if component is still mounted and refs are available
                if (!isMounted || !fromInputRef.current || !toInputRef.current) {
                    return;
                }

                // Create autocomplete instances with optimized options
                fromAutocompleteRef.current = new window.google.maps.places.Autocomplete(fromInputRef.current, {
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['establishment', 'geocode'],
                    componentRestrictions: { country: 'in' } // Restrict to India if needed
                });

                toAutocompleteRef.current = new window.google.maps.places.Autocomplete(toInputRef.current, {
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['establishment', 'geocode'],
                    componentRestrictions: { country: 'in' }
                });

                // Add event listeners
                fromAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(fromAutocompleteRef.current, 'from'));

                toAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(toAutocompleteRef.current, 'to'));
            } catch (error) {
                toast.error('Error initializing Google Maps autocomplete:', error);
                // Optionally show user-friendly error message
            }
        };

        initAutocomplete();

        // Cleanup function
        return () => {
            isMounted = false;

            // Clear autocomplete instances and event listeners
            if (fromAutocompleteRef.current && window.google?.maps?.event) {
                window.google.maps.event.clearInstanceListeners(fromAutocompleteRef.current);
                fromAutocompleteRef.current = null;
            }

            if (toAutocompleteRef.current && window.google?.maps?.event) {
                window.google.maps.event.clearInstanceListeners(toAutocompleteRef.current);
                toAutocompleteRef.current = null;
            }
        };
    }, [dispatch]);

    return (
        <motion.main
            ref={containerRef}
            className="p_home_container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: backgroundY }}>
            <div className="p_home_content">
                <motion.div
                    className={`p_home_form_container ${isLoading ? 'loading' : ''}`}
                    variants={formContainerVariants}
                    style={{ scale: formScale, opacity: formOpacity }}>
                    <motion.h1
                        className="p_home_title"
                        variants={titleVariants}>
                        Velocity Rides
                    </motion.h1>

                    <motion.div
                        className="p_home_trip_toggle"
                        variants={toggleVariants}
                        onClick={toggleTripType}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}>
                        <motion.div
                            className="p_home_toggle_slider"
                            animate={{
                                x: tripType === 'OneWay' ? '0%' : '100%'
                            }}
                            transition={{
                                duration: 0.1,
                                ease: 'easeOut'
                            }}
                        />

                        <span className={tripType === 'OneWay' ? 'p_home_active' : ''}>One Way</span>
                        <span className={tripType === 'RoundTrip' ? 'p_home_active' : ''}>Round Trip</span>
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        <motion.div
                            className="p_home_form_group"
                            variants={inputVariants}
                            whileHover="hover"
                            animate={focusedInput === 'from' ? 'focus' : 'visible'}>
                            <motion.div
                                variants={iconVariants}
                                whileHover="hover">
                                <FaMapMarkerAlt className="p_home_input_icon" />
                            </motion.div>
                            <input
                                type="text"
                                ref={fromInputRef}
                                placeholder="Pick-up Location"
                                value={formData.from}
                                onChange={handleInputChange('from')}
                                onFocus={() => handleInputFocus('from')}
                                onBlur={handleInputBlur}
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="p_home_form_group"
                            variants={inputVariants}
                            whileHover="hover"
                            animate={focusedInput === 'to' ? 'focus' : 'visible'}>
                            <motion.div
                                variants={iconVariants}
                                whileHover="hover">
                                <FaRoute className="p_home_input_icon" />
                            </motion.div>
                            <input
                                type="text"
                                ref={toInputRef}
                                placeholder="Drop-off Location"
                                value={formData.to}
                                onChange={handleInputChange('to')}
                                onFocus={() => handleInputFocus('to')}
                                onBlur={handleInputBlur}
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="p_home_form_group"
                            variants={inputVariants}
                            whileHover="hover"
                            animate={focusedInput === 'pickupDate' ? 'focus' : 'visible'}>
                            <motion.div
                                variants={iconVariants}
                                whileHover="hover">
                                <FaCalendarAlt className="p_home_input_icon" />
                            </motion.div>
                            <DatePicker
                                selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
                                onChange={handleDateChange('pickupDate')}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Pick-Up Date"
                                required
                                className="p_home_custom_datepicker"
                                calendarClassName="p_home_custom_calendar"
                                popperClassName="p_home_custom_popper"
                                wrapperClassName="p_home_custom_wrapper"
                                showPopperArrow={false}
                                minDate={new Date()}
                                onFocus={() => handleInputFocus('pickupDate')}
                                onBlur={handleInputBlur}
                            />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {tripType === 'RoundTrip' && (
                                <motion.div
                                    className="p_home_form_group"
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeOut'
                                    }}
                                    whileHover="hover">
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover="hover">
                                        <FaCalendarAlt className="p_home_input_icon" />
                                    </motion.div>
                                    <DatePicker
                                        selected={formData.dropOffDate ? new Date(formData.dropOffDate) : null}
                                        onChange={handleDateChange('dropOffDate')}
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="Drop-Off Date"
                                        required
                                        className="p_home_custom_datepicker"
                                        calendarClassName="p_home_custom_calendar"
                                        popperClassName="p_home_custom_popper"
                                        wrapperClassName="p_home_custom_wrapper"
                                        showPopperArrow={false}
                                        minDate={formData.pickupDate ? new Date(formData.pickupDate) : null}
                                        onFocus={() => handleInputFocus('dropOffDate')}
                                        onBlur={handleInputBlur}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="p_home_search_cab_button"
                            disabled={isLoading}>
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.3)',
                                                borderTop: '2px solid white'
                                            }}
                                        />
                                        Finding Rides...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="ready"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}>
                                            <FaCarAlt />
                                        </motion.div>
                                        Go for it
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </form>

                    {/* Floating elements for visual enhancement */}
                    <motion.div
                        className="floating-element"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(45deg, rgba(52, 152, 219, 0.1), rgba(243, 156, 18, 0.1))',
                            borderRadius: '50%',
                            zIndex: -1
                        }}
                        animate={{
                            y: [0, -5, 0],
                            rotate: [0, 3, 0],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />

                    <motion.div
                        className="floating-element"
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '30px',
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(45deg, rgba(243, 156, 18, 0.1), rgba(52, 152, 219, 0.1))',
                            borderRadius: '50%',
                            zIndex: -1
                        }}
                        animate={{
                            y: [0, 4, 0],
                            rotate: [0, -3, 0],
                            scale: [1, 0.98, 1]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.5
                        }}
                    />
                </motion.div>
            </div>

            {/* Background decorative elements */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: '15%',
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.6, 0.4],
                    x: [0, 5, 0]
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                }}
            />
        </motion.main>
    );
};

export default PassengerHome;
