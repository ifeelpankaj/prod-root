// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
const Contact = () => {
    const line_1 = ` Have questions? We're here to help. Reach out to us anytime.`;
    return (
        <section
            className="safarcab_contact_section"
            id="contact">
            <div className="safarcab_container">
                <div className="safarcab_section_header">
                    <motion.h2
                        className="safarcab_section_title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>
                        Get In Touch
                    </motion.h2>
                    <motion.p
                        className="safarcab_section_subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}>
                        {line_1}
                    </motion.p>
                </div>

                <div className="safarcab_contact_content">
                    <motion.div
                        className="safarcab_contact_info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}>
                        <div className="safarcab_contact_item">
                            <div className="safarcab_contact_icon">📞</div>
                            <div className="safarcab_contact_details">
                                <h4 className="safarcab_contact_title">Call Us</h4>
                                <p className="safarcab_contact_text">+91 79730 80603</p>
                                <p className="safarcab_contact_text">+91 70285 31074</p>
                            </div>
                        </div>

                        <div className="safarcab_contact_item">
                            <div className="safarcab_contact_icon">✉️</div>
                            <div className="safarcab_contact_details">
                                <h4 className="safarcab_contact_title">Email Us</h4>
                                <p className="safarcab_contact_text">support@safarcabs.com</p>
                            </div>
                        </div>

                        <div className="safarcab_contact_item">
                            <div className="safarcab_contact_icon">📍</div>
                            <div className="safarcab_contact_details">
                                <h4 className="safarcab_contact_title">Visit Us</h4>
                                <p className="safarcab_contact_text">Kabdwals empire</p>
                                <p className="safarcab_contact_text">Satkhol, Uttarakhand 263158</p>
                            </div>
                        </div>

                        <div className="safarcab_contact_item">
                            <div className="safarcab_contact_icon">🕐</div>
                            <div className="safarcab_contact_details">
                                <h4 className="safarcab_contact_title">Working Hours</h4>
                                <p className="safarcab_contact_text">24/7 Service Available</p>
                                <p className="safarcab_contact_text">Office: 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="safarcab_contact_form_wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}>
                        <form className="safarcab_contact_form">
                            <div className="safarcab_form_row">
                                <div className="safarcab_form_group">
                                    <label className="safarcab_form_label">Full Name</label>
                                    <input
                                        type="text"
                                        className="safarcab_form_input"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="safarcab_form_group">
                                    <label className="safarcab_form_label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="safarcab_form_input"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="safarcab_form_group">
                                <label className="safarcab_form_label">Email Address</label>
                                <input
                                    type="email"
                                    className="safarcab_form_input"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="safarcab_form_group">
                                <label className="safarcab_form_label">Subject</label>
                                <select
                                    className="safarcab_form_input"
                                    required>
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="booking">Booking Support</option>
                                    <option value="driver">Driver Partnership</option>
                                    <option value="complaint">Complaint</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                            </div>

                            <div className="safarcab_form_group">
                                <label className="safarcab_form_label">Message</label>
                                <textarea
                                    className="safarcab_form_textarea"
                                    rows="5"
                                    placeholder="Write your message here..."
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="safarcab_submit_btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
