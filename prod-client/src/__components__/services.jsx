// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
const Services = () => {
    return (
        <section
            className="safarcab_services_section"
            id="services">
            <div className="safarcab_container">
                <div className="safarcab_section_header">
                    <motion.h2
                        className="safarcab_section_title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>
                        Our Premium Services
                    </motion.h2>
                    <motion.p
                        className="safarcab_section_subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}>
                        Choose from our wide range of premium transportation services designed for every journey across Uttarakhand
                    </motion.p>
                </div>

                <div className="safarcab_services_grid">
                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">🚗</div>
                        <h3 className="safarcab_service_title">City Rides</h3>
                        <p className="safarcab_service_description">
                            Quick and comfortable rides within cities like Dehradun, Haridwar, and Rishikesh with professional drivers.
                        </p>
                    </motion.div>

                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">🏔️</div>
                        <h3 className="safarcab_service_title">Hill Station Tours</h3>
                        <p className="safarcab_service_description">
                            Explore Mussoorie, Nainital, and other hill stations with our specialized mountain-ready vehicles.
                        </p>
                    </motion.div>

                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">🛣️</div>
                        <h3 className="safarcab_service_title">Outstation Travel</h3>
                        <p className="safarcab_service_description">
                            Long-distance travel across Uttarakhand and neighboring states with flexible packages.
                        </p>
                    </motion.div>

                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">✈️</div>
                        <h3 className="safarcab_service_title">Airport Transfer</h3>
                        <p className="safarcab_service_description">
                            Hassle-free airport pickups and drops with flight tracking and 24/7 availability.
                        </p>
                    </motion.div>

                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">🙏</div>
                        <h3 className="safarcab_service_title">Pilgrimage Tours</h3>
                        <p className="safarcab_service_description">Sacred journeys to Char Dham, Kedarnath, Badrinath with comfortable vehicles.</p>
                    </motion.div>

                    <motion.div
                        className="safarcab_service_card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}>
                        <div className="safarcab_service_icon">👥</div>
                        <h3 className="safarcab_service_title">Group Travel</h3>
                        <p className="safarcab_service_description">Spacious vehicles for family trips, corporate travel, and group adventures.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
