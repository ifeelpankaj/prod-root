// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../__assets__/hero.png';
import { useNavigate } from 'react-router-dom';
const SafarCabHomePage = () => {
    const navigate = useNavigate();
    const handleBookNow = () => {
        navigate('/home');
    };
    const handleAuth = () => {
        navigate('/auth');
    };
    const line = ` Experience premium cab services across Uttarakhand's breathtaking landscapes. From city rides to mountain expeditions, we
                            ensure your journey is safe, comfortable, and memorable.`;
    return (
        <section
            className="safarcab_hero_section_container"
            style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="safarcab_hero_section_overlay">
                <motion.div
                    className="safarcab_hero_section_content"
                    initial={{ opacity: 0, x: -50, y: 30 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
                    }}>
                    <div className="safarcab_hero_section_text_wrapper">
                        <motion.div
                            className="safarcab_hero_tagline"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}>
                            Journey Through Uttarakhand
                        </motion.div>

                        <motion.h1
                            className="safarcab_hero_section_headline"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.5,
                                duration: 1,
                                ease: 'easeOut'
                            }}>
                            Reliable Cabs.
                            <br />
                            Anytime. Anywhere.
                        </motion.h1>

                        <motion.p
                            className="safarcab_hero_section_subtext"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}>
                            {line}
                        </motion.p>

                        <motion.div
                            className="safarcab_hero_section_cta_buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}>
                            <motion.button
                                className="safarcab_hero_section_btn safarcab_hero_section_btn_primary"
                                onClick={handleBookNow}
                                whileHover={{
                                    scale: 1.02,
                                    y: -3,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                }}>
                                Book Your Ride
                            </motion.button>

                            <motion.button
                                className="safarcab_hero_section_btn safarcab_hero_section_btn_outlined"
                                onClick={handleAuth}
                                whileHover={{
                                    scale: 1.02,
                                    y: -3,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                }}>
                                Become a Driver
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Additional modern UI elements */}
                <motion.div
                    className="safarcab_hero_floating_elements"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}>
                    {/* Floating stats or features could go here */}
                </motion.div>
            </div>
        </section>
    );
};

export default SafarCabHomePage;
