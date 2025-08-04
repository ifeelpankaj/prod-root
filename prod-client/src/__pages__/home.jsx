// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import PassengerHome from './Passenger/Passenger.home';
import { useSelector } from 'react-redux';
import DriverHome from './Driver/driver.home';
import { motion } from 'framer-motion';
import heroBg from '../__assets__/hero.png';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const handleBookNow = () => {
        navigate('/home');
    };
    const handleAuth = () => {
        navigate('/auth');
    };
    return (
        <section
            className="hero_section_container"
            style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero_section_overlay">
                <motion.div
                    className="hero_section_content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}>
                    <motion.div
                        className="hero_section_text_wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}>
                        <motion.h1
                            className="hero_section_headline"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}>
                            Reliable Cabs. Anytime. Anywhere.
                        </motion.h1>
                        <motion.p
                            className="hero_section_subtext"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}>
                            Book your ride in seconds with our smart cab system.
                        </motion.p>
                        <motion.div
                            className="hero_section_cta_buttons"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}>
                            <button
                                className="hero_section_btn hero_section_btn_primary"
                                onClick={handleBookNow}>
                                Book Now
                            </button>
                            <button
                                className="hero_section_btn hero_section_btn_outlined"
                                onClick={handleAuth}>
                                Become a Driver
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    // Show hero section when user is not available
    if (!user) {
        return <HeroSection />;
    }

    const isPassenger = user?.role;

    return <div>{isPassenger === 'Passenger' ? <PassengerHome /> : <DriverHome />}</div>;
};

export default Home;
