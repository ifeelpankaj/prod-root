/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, Mail, Lock, Shield, ArrowRight, Zap, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../__redux__/thunks/auth.thunk';
import { useForgetPasswordMutation, useResetPasswordMutation } from '../__redux__/api/auth.api';
const Login = () => {
    // Login state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isAnimating, setIsAnimating] = useState(false);

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotStep, setForgotStep] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [otpSent, setOtpSent] = useState(false);
    const [forgetPassword, { isLoading: forgetPasswordLoading }] = useForgetPasswordMutation();
    const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();
    // Particle animation state
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles for animation
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));
        setParticles(newParticles);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const resultAction = await dispatch(login({ email, password }));

            if (login.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload.message || 'Login successful!');
                navigate('/dashboard');
            } else {
                toast.error(resultAction.payload || 'Login failed');
            }
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 1: Send OTP to email
    const handleSendOTP = async () => {
        if (!forgotEmail) {
            toast.error('Please enter your email');
            return;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(forgotEmail)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            const response = await forgetPassword(forgotEmail);

            if (response.error) {
                toast.error(response.error.data?.message || 'Failed to send OTP');
                return;
            }

            if (response.data?.success) {
                toast.success(response.data.message || 'OTP sent to your email');
                setOtpSent(true);
                setForgotStep(2);
            }
        } catch (error) {
            toast.error(`Failed to send OTP: ${error.message}`);
        }
    };

    // Step 2: Reset password with OTP
    const handleResetPassword = async () => {
        // Validation
        if (!otp) {
            toast.error('Please enter the OTP');
            return;
        }

        if (otp.length !== 6) {
            toast.error('OTP must be 6 digits');
            return;
        }

        if (!newPassword) {
            toast.error('Please enter a new password');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (!confirmPassword) {
            toast.error('Please confirm your password');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await resetPassword({
                otp,
                newPassword
            });

            if (response.error) {
                toast.error(response.error.data?.message || 'Failed to reset password');
                return;
            }

            if (response.data?.success) {
                toast.success(response.data.message || 'Password reset successfully');
                setForgotStep(3);

                // Auto close modal after 2 seconds and redirect to login
                setTimeout(() => {
                    closeForgotPasswordModal();
                }, 2000);
            }
        } catch (error) {
            toast.error(`Failed to reset password: ${error.message}`);
        }
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
        setForgotEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setForgotStep(1);
    };

    return (
        <div className="login_container">
            {/* Animated Background */}
            <div className="login_background">
                {/* Gradient Orbs */}
                <div className="login_orb login_orb--primary"></div>
                <div className="login_orb login_orb--secondary"></div>
                <div className="login_orb login_orb--accent"></div>

                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="login_particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                            animationDuration: `${particle.speed}s`,
                            animationDelay: `${particle.id * 0.1}s`
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="login_grid"></div>
            </div>

            {/* Main Content */}
            <div className="login_content">
                <div className="login_wrapper">
                    {/* Logo & Header */}
                    <div className="login_header">
                        <div className="login_logo">
                            <Shield className="login_logo-icon" />
                        </div>
                        <h1 className="login_title">Admin Center</h1>
                        <div className="login_subtitle">
                            <div className="login_status-dot login_status-dot--active"></div>
                            <span>Secure • Professional • Powerful</span>
                            <div className="login_status-dot login_status-dot--secondary"></div>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className={`login_card ${isAnimating ? 'login_card--animating' : ''}`}>
                        {/* Email Field */}
                        <div className="login_field-group">
                            <label className="login_label">Email Address</label>
                            <div className="login_input-wrapper">
                                <Mail className="login_input-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login_input"
                                    placeholder="Enter your admin email"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="login_field-group">
                            <label className="login_label">Password</label>
                            <div className="login_input-wrapper">
                                <Lock className="login_input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login_input"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="login_password-toggle"
                                    disabled={isLoading}>
                                    {showPassword ? <EyeOff className="login_toggle-icon" /> : <Eye className="login_toggle-icon" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="login_forgot-wrapper">
                            <button
                                onClick={() => setShowForgotPassword(true)}
                                className="login_forgot-link"
                                disabled={isLoading}>
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading || !email || !password}
                            className={`login_submit-btn ${isLoading ? 'login_submit-btn--loading' : ''}`}>
                            <div className="login_btn-content">
                                {isLoading ? (
                                    <>
                                        <div className="login_spinner"></div>
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Access Admin Center</span>
                                        <ArrowRight className="login_btn-arrow" />
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Security Badge */}
                        <div className="login_security-badge">
                            <div className="login_security-content">
                                <Zap className="login_security-icon" />
                                <span className="login_security-text">Secured with enterprise-grade encryption</span>
                                <div className="login_security-dots">
                                    <div className="login_security-dot login_security-dot--green"></div>
                                    <div className="login_security-dot login_security-dot--blue"></div>
                                    <div className="login_security-dot login_security-dot--purple"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="login_footer">
                        <p>© 2025 Admin Center. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="login_modal-overlay">
                    <div className="login_modal">
                        <div className="login_modal-header">
                            <h2 className="login_modal-title">Reset Password</h2>
                            <button
                                onClick={closeForgotPasswordModal}
                                className="login_modal-close">
                                <X className="login_close-icon" />
                            </button>
                        </div>

                        {forgotStep === 1 && (
                            <div className="login_modal-content">
                                <div className="login_modal-intro">
                                    <div className="login_modal-icon login_modal-icon--mail">
                                        <Mail />
                                    </div>
                                    <p className="login_modal-description">Enter your email address to receive a secure reset code.</p>
                                </div>
                                <div className="login_field-group">
                                    <div className="login_input-wrapper">
                                        <Mail className="login_input-icon" />
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            className="login_input"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSendOTP}
                                    disabled={forgetPasswordLoading || !forgotEmail.trim()}
                                    className="login_modal-btn login_modal-btn--primary">
                                    Send Reset Code
                                </button>
                            </div>
                        )}

                        {forgotStep === 2 && (
                            <div className="login_modal-content">
                                <div className="login_modal-intro">
                                    <div className="login_modal-icon login_modal-icon--lock">
                                        <Lock />
                                    </div>
                                    <p className="login_modal-description">
                                        Enter the 6-digit code sent to <span className="login_email-highlight">{forgotEmail}</span>
                                    </p>
                                </div>

                                {/* OTP Input */}
                                <div className="login_otp-wrapper">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                        className="login_otp-input"
                                        placeholder="● ● ● ● ● ●"
                                        maxLength={6}
                                    />
                                </div>

                                {/* New Password */}
                                <div className="login_field-group">
                                    <div className="login_input-wrapper">
                                        <Lock className="login_input-icon" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="login_input"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="login_field-group">
                                    <div className="login_input-wrapper">
                                        <Lock className="login_input-icon" />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="login_input"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="login_modal-actions">
                                    <button
                                        onClick={() => setForgotStep(1)}
                                        className="login_modal-btn login_modal-btn--secondary">
                                        Back
                                    </button>
                                    <button
                                        onClick={handleResetPassword}
                                        disabled={!otp || !newPassword || !confirmPassword || newPassword !== confirmPassword || resetPasswordLoading}
                                        className="login_modal-btn login_modal-btn--primary">
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        )}

                        {forgotStep === 3 && (
                            <div className="login_modal-content login_modal-content--success">
                                <div className="login_success-wrapper">
                                    <div className="login_success-icon">
                                        <Star />
                                    </div>
                                    <div className="login_success-content">
                                        <h3 className="login_success-title">Password Reset Complete!</h3>
                                        <p className="login_success-description">
                                            Your password has been successfully updated. You can now sign in with your new credentials.
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeForgotPasswordModal}
                                        className="login_modal-btn login_modal-btn--success">
                                        Continue to Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
