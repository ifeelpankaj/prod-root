// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
const About = () => {
    const line = `We're committed to providing the most reliable, safe, and comfortable transportation experience across Uttarakhand. Our
                            platform combines cutting-edge technology with local expertise to serve you better.`;
    return (
        <section
            className="safarcab_about_section"
            id="about">
            <div className="safarcab_container">
                <div className="safarcab_about_content">
                    <motion.div
                        className="safarcab_about_text"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}>
                        <h2 className="safarcab_about_title">Why Choose SafarCabs?</h2>
                        <p className="safarcab_about_description">{line}</p>

                        <div className="safarcab_features_list">
                            <motion.div
                                className="safarcab_feature_item"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}>
                                <span className="safarcab_feature_icon">🛡️</span>
                                <div className="safarcab_feature_content">
                                    <h4 className="safarcab_feature_title">100% Verified Drivers</h4>
                                    <p className="safarcab_feature_text">All our drivers are background-checked and professionally trained</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="safarcab_feature_item"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}>
                                <span className="safarcab_feature_icon">🕐</span>
                                <div className="safarcab_feature_content">
                                    <h4 className="safarcab_feature_title">24/7 Availability</h4>
                                    <p className="safarcab_feature_text">Book rides anytime, anywhere across Uttarakhand</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="safarcab_feature_item"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}>
                                <span className="safarcab_feature_icon">💳</span>
                                <div className="safarcab_feature_content">
                                    <h4 className="safarcab_feature_title">Multiple Payment Options</h4>
                                    <p className="safarcab_feature_text">Pay via cash, card, UPI, or wallet - your choice</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="safarcab_about_visual"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}>
                        <div className="safarcab_stats_grid">
                            <motion.div
                                className="safarcab_stat_card"
                                whileHover={{ scale: 1.05 }}>
                                <div className="safarcab_stat_number">500+</div>
                                <div className="safarcab_stat_label">Happy Customers</div>
                            </motion.div>

                            <motion.div
                                className="safarcab_stat_card"
                                whileHover={{ scale: 1.05 }}>
                                <div className="safarcab_stat_number">20+</div>
                                <div className="safarcab_stat_label">Verified Drivers</div>
                            </motion.div>

                            <motion.div
                                className="safarcab_stat_card"
                                whileHover={{ scale: 1.05 }}>
                                <div className="safarcab_stat_number">5+</div>
                                <div className="safarcab_stat_label">Cities Covered</div>
                            </motion.div>

                            <motion.div
                                className="safarcab_stat_card"
                                whileHover={{ scale: 1.05 }}>
                                <div className="safarcab_stat_number">24/7</div>
                                <div className="safarcab_stat_label">Support Available</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
