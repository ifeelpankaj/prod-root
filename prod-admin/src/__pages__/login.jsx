// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../__redux__/thunks/auth.thunk';
import { toast } from 'react-toastify';
import { CircleX, Eye, EyeOff } from 'lucide-react';
import { useForgetPasswordMutation, useResetPasswordMutation } from '../__redux__/api/auth.api';

const Login = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp+password, 3: success
    // eslint-disable-next-line no-unused-vars
    const [otpSent, setOtpSent] = useState(false);

    // RTK Query mutations
    const [forgetPassword, { isLoading: forgetPasswordLoading }] = useForgetPasswordMutation();
    const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();

    // Login handler
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
            const response = await forgetPassword({ email: forgotEmail });

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
                email: forgotEmail,
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

    // Resend OTP
    const handleResendOTP = async () => {
        await handleSendOTP();
    };

    // Close modal and reset all states
    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
        setForgotEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setForgotStep(1);
        setOtpSent(false);
    };

    // Go back to previous step
    const goBackStep = () => {
        if (forgotStep === 2) {
            setForgotStep(1);
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Header */}
                <div className="login-header">
                    <div className="admin-badge">Admin Center</div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your admin account</p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleLogin}
                    className="login-form">
                    <div className="form-group">
                        <label
                            htmlFor="email"
                            className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className="form-label">
                            Password
                        </label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="form-input password-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    <div className="forgot-password-container">
                        <button
                            type="button"
                            className="forgot-password"
                            onClick={() => setShowForgotPassword(true)}
                            disabled={isLoading}>
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div
                    className="modal-overlay"
                    onClick={(e) => e.target === e.currentTarget && closeForgotPasswordModal()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Reset Password</h2>
                            <button
                                className="modal-close"
                                onClick={closeForgotPasswordModal}
                                disabled={forgetPasswordLoading || resetPasswordLoading}>
                                <CircleX />
                            </button>
                        </div>

                        <div className="modal-body">
                            {forgotStep === 1 && (
                                // Step 1: Enter Email
                                <>
                                    <p className="modal-description">Enter your email address and will send you an OTP to reset your password.</p>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            placeholder="Enter your email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            disabled={forgetPasswordLoading}
                                            autoFocus
                                        />
                                    </div>
                                    <button
                                        className="modal-button"
                                        onClick={handleSendOTP}
                                        disabled={forgetPasswordLoading || !forgotEmail.trim()}>
                                        {forgetPasswordLoading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                </>
                            )}

                            {forgotStep === 2 && (
                                // Step 2: Enter OTP and New Password
                                <>
                                    <p className="modal-description">
                                        Enter the 6-digit OTP sent to <strong>{forgotEmail}</strong> and create a new password.
                                    </p>

                                    <div className="form-group">
                                        <label className="form-label">OTP Code</label>
                                        <input
                                            type="text"
                                            className="form-input otp-input"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 6) setOtp(value);
                                            }}
                                            maxLength={6}
                                            disabled={resetPasswordLoading}
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            className="resend-otp"
                                            onClick={handleResendOTP}
                                            disabled={forgetPasswordLoading}>
                                            {forgetPasswordLoading ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            placeholder="Enter new password (min 6 characters)"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            disabled={resetPasswordLoading}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            placeholder="Confirm your new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={resetPasswordLoading}
                                        />
                                    </div>

                                    <div className="modal-buttons">
                                        <button
                                            className="modal-button secondary"
                                            onClick={goBackStep}
                                            disabled={resetPasswordLoading}>
                                            Back
                                        </button>
                                        <button
                                            className="modal-button"
                                            onClick={handleResetPassword}
                                            disabled={resetPasswordLoading || !otp || !newPassword || !confirmPassword}>
                                            {resetPasswordLoading ? 'Resetting...' : 'Reset Password'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {forgotStep === 3 && (
                                // Step 3: Success
                                <div className="success-step">
                                    <div className="success-icon">✓</div>
                                    <h3>Password Reset Successful!</h3>
                                    <p>Your password has been reset successfully. You can now login with your new password.</p>
                                    <button
                                        className="modal-button"
                                        onClick={closeForgotPasswordModal}>
                                        Continue to Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
