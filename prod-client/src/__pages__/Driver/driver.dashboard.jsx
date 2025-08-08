/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import { FaWallet, FaExchangeAlt, FaCar, FaCalendarAlt, FaCopy, FaCheckCircle, FaTimes, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MessageDisplay from '../../__components__/message.display';
import {
    useCancelBookingMutation,
    useCompleteBookingMutation,
    useConfirmBookingMutation,
    useDriverDashboardOrdersQuery,
    useDriverTransactionsQuery,
    useDriverWalletInfoQuery
} from '../../__redux__/api/driver.api';
import { date } from '../../__utils__/date.utils';
import img from '../../__assets__/driverImg.png';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DriverDashboard = () => {
    const { data: bookingsData, isLoading: dashboardLoading, error: driverBookingError } = useDriverDashboardOrdersQuery();
    const { data: walletInfo, isLoading: walletLoading, isError: walletError } = useDriverWalletInfoQuery();

    const limit = 6;
    const page = 1;
    const { data: transactionDetails, isLoading: transactionLoading, isError: transactionError } = useDriverTransactionsQuery({ page, limit });
    console.log('booking details', bookingsData);
    console.log('booking details', walletInfo);
    console.log('booking details', transactionDetails);
    const [loadStart] = useState(Date.now()); // store the time when component first renders
    const elapsed = Date.now() - loadStart;

    const isAnyDataMissing = !bookingsData || !walletInfo || !transactionDetails;

    const showLoader = isAnyDataMissing && elapsed < 10000 * 60;

    const [activeTab, setActiveTab] = useState('assigned');

    const walletBalance = walletInfo?.balance || 0;
    const transactions = transactionDetails?.data || [];

    const upcomingBookingCount = bookingsData?.unacceptedBookings?.length || 0;
    const confirmBookingsCount = bookingsData?.acceptedBookings?.length || 0;

    const upcomingBookings = bookingsData?.unacceptedBookings || [];
    const confirmBookings = bookingsData?.acceptedBookings || [];

    const navigate = useNavigate();
    const [confirmBooking, { isLoading: isConfirming, isError: confirmingError }] = useConfirmBookingMutation();
    const [cancelBooking, { isLoading: isCancelling, isError: cancellingError }] = useCancelBookingMutation();
    const [completeBooking, { isLoading: isCompleting, isError: completingError }] = useCompleteBookingMutation();
    const handleAcceptBooking = async (booking) => {
        try {
            const res = await confirmBooking({ orderId: booking.orderId._id }).unwrap();

            if (res.success) {
                toast.success(res.message);
            }
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const handleCancelBooking = async (booking) => {
        try {
            const res = await cancelBooking({ orderId: booking.orderId._id }).unwrap();
            if (res.success) {
                toast.success(res.message);
            }
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const handleCompleteBooking = async (booking) => {
        try {
            const res = await completeBooking({ orderId: booking.orderId._id }).unwrap();

            if (res.success) {
                toast.success(res.message);
            }
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const handleViewDetails = (booking) => {
        navigate(`/driver-order/${booking?.orderId?._id}`);
    };
    return (
        <div className="dashboard-container">
            {/* Left Sidebar - Profile & Wallet */}
            {walletLoading || showLoader ? (
                <div className="dashboard-sidebar">
                    <div className="profile-section">
                        <Skeleton
                            height={80}
                            width={80}
                            style={{ borderRadius: '50%' }}
                        />
                        <Skeleton
                            height={24}
                            width={150}
                        />
                        <Skeleton
                            height={16}
                            width={120}
                        />
                        <div className="wallet-card">
                            <Skeleton
                                height={60}
                                width="100%"
                            />
                            <Skeleton
                                height={40}
                                width={120}
                            />
                            <Skeleton
                                height={36}
                                width={100}
                            />
                        </div>
                    </div>
                </div>
            ) : walletError ? (
                <div className="dashboard-sidebar">
                    <MessageDisplay
                        type="error"
                        message="Error loading wallet info"
                    />
                </div>
            ) : (
                <div className="dashboard-sidebar">
                    <div className="profile-section">
                        <div>
                            <img
                                src={img}
                                alt="Driver"
                                className="profile-avatar"
                            />
                        </div>
                        <h2 className="profile-name">{walletInfo.name || 'Driver'}</h2>
                        <p className="member-since">Member since {date.formatDate(walletInfo.memberSince)}</p>

                        <div className="wallet-card">
                            <div className="wallet-header">
                                <FaWallet className="wallet-icon" />
                                <span>You will get Paid by us</span>
                            </div>
                            <div className="wallet-amount">₹{walletBalance.toLocaleString()}</div>
                            <div className="wallet-actions">
                                <button className="wallet-btn primary">
                                    <FaCopy /> Statement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            {dashboardLoading || transactionLoading || showLoader ? (
                <div className="dashboard-main">
                    <div className="dashboard-header">
                        <Skeleton
                            height={32}
                            width={200}
                        />
                        <div className="header-stats">
                            <div className="stat-card">
                                <Skeleton
                                    height={24}
                                    width={24}
                                />
                                <div>
                                    <Skeleton
                                        height={20}
                                        width={60}
                                    />
                                    <Skeleton
                                        height={16}
                                        width={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-navigation">
                        <Skeleton
                            height={48}
                            width={150}
                        />
                        <Skeleton
                            height={48}
                            width={150}
                        />
                        <Skeleton
                            height={48}
                            width={150}
                        />
                    </div>
                    <div className="tab-content">
                        <div className="bookings-grid">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <BookingCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : driverBookingError || transactionError ? (
                <div className="dashboard-main">
                    <div className="dashboard-header">
                        <h1>Driver Dashboard</h1>
                    </div>
                    <MessageDisplay
                        type="error"
                        message={driverBookingError ? 'Error loading bookings data' : 'Error loading transaction data'}
                    />
                </div>
            ) : (
                <div className="dashboard-main">
                    <div className="dashboard-header">
                        <h1>Driver Dashboard</h1>
                        <div className="header-stats">
                            <div className="stat-card">
                                <FaCar />
                                <div>
                                    <span className="stat-number">{upcomingBookingCount + confirmBookingsCount}</span>
                                    <span className="stat-label">Total Bookings</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="tab-navigation">
                        <button
                            className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
                            onClick={() => setActiveTab('assigned')}>
                            <FaCalendarAlt />
                            Assigned Bookings
                            <span className="tab-count">{upcomingBookingCount}</span>
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('upcoming')}>
                            <FaCar />
                            Upcoming Bookings
                            <span className="tab-count">{confirmBookingsCount}</span>
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transactions')}>
                            <FaExchangeAlt />
                            Transactions
                            <span className="tab-count">{transactions.length}</span>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        <AnimatePresence mode="wait">
                            {activeTab === 'assigned' && (
                                <motion.div
                                    key="assigned"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bookings-grid">
                                    {upcomingBookings.length > 0 ? (
                                        upcomingBookings.map((booking) => (
                                            <BookingCard
                                                key={booking.orderId._id}
                                                booking={booking}
                                                type="assigned"
                                                onAccept={handleAcceptBooking}
                                                onCancel={handleCancelBooking}
                                                onViewDetails={handleViewDetails}
                                                isConfirming={isConfirming}
                                                isCancelling={isCancelling}
                                                confirmingError={confirmingError}
                                                cancellingError={cancellingError}
                                            />
                                        ))
                                    ) : (
                                        <div className="empty-state">
                                            <FaCalendarAlt />
                                            <h3>No Assigned Bookings</h3>
                                            <MessageDisplay
                                                type="info"
                                                message="We will notify you when new bookings are assigned"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'upcoming' && (
                                <motion.div
                                    key="upcoming"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bookings-grid">
                                    {confirmBookings.length > 0 ? (
                                        confirmBookings.map((booking) => (
                                            <BookingCard
                                                key={booking.orderId._id}
                                                booking={booking}
                                                type="confirmed"
                                                onComplete={handleCompleteBooking}
                                                onViewDetails={handleViewDetails}
                                                isCompleting={isCompleting}
                                                completingError={completingError}
                                            />
                                        ))
                                    ) : (
                                        <div className="empty-state">
                                            <FaCar />
                                            <h3>No Upcoming Bookings</h3>
                                            <MessageDisplay
                                                type="info"
                                                message="Your confirmed bookings will appear here"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'transactions' && (
                                <motion.div
                                    key="transactions"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="transactions-list">
                                    {transactions.length > 0 ? (
                                        transactions.map((transaction) => (
                                            <TransactionCard
                                                key={transaction._id}
                                                transaction={transaction}
                                            />
                                        ))
                                    ) : (
                                        <div className="empty-state">
                                            <FaExchangeAlt />
                                            <h3>No Transactions</h3>
                                            <MessageDisplay
                                                type="info"
                                                message="Your transaction history will appear here"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
};

// Skeleton component for booking cards
const BookingCardSkeleton = () => {
    return (
        <div className="booking-card skeleton">
            <div className="booking-header">
                <Skeleton
                    height={24}
                    width={120}
                />
                <Skeleton
                    height={24}
                    width={80}
                />
            </div>
            <div className="booking-route">
                <div className="route-point pickup">
                    <Skeleton
                        height={12}
                        width={12}
                        style={{ borderRadius: '50%' }}
                    />
                    <Skeleton
                        height={16}
                        width={200}
                    />
                </div>
                <div className="route-line">
                    <Skeleton
                        height={30}
                        width={2}
                    />
                </div>
                <div className="route-point destination">
                    <Skeleton
                        height={12}
                        width={12}
                        style={{ borderRadius: '50%' }}
                    />
                    <Skeleton
                        height={16}
                        width={180}
                    />
                </div>
            </div>
            <div className="booking-footer">
                <Skeleton
                    height={20}
                    width={120}
                />
                <Skeleton
                    height={36}
                    width={100}
                />
            </div>
        </div>
    );
};

const BookingCard = ({
    booking,
    type,
    onAccept,
    onCancel,
    onComplete,
    onViewDetails,
    isConfirming = false,
    isCancelling = false,
    isCompleting = false,
    confirmingError = false,
    cancellingError = false,
    completingError = false
}) => {
    const isAcceptLoading = isConfirming;
    const isCancelLoading = isCancelling;
    const isCompleteLoading = isCompleting;
    const isAnyLoading = isAcceptLoading || isCancelLoading || isCompleteLoading;
    const hasError = confirmingError || cancellingError || completingError;

    return (
        <motion.div
            className={`booking-card ${type} ${hasError ? 'error' : ''}`}
            whileHover={!isAnyLoading && !hasError ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
            transition={{ duration: 0.2 }}
            onClick={() => !isAnyLoading && !hasError && onViewDetails && onViewDetails(booking)}
            style={{
                cursor: !isAnyLoading && !hasError && onViewDetails ? 'pointer' : 'default',
                opacity: hasError ? 0.7 : 1
            }}>
            {/* Loading Overlay */}
            {isAnyLoading && (
                <div className="booking-loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}

            <div className="booking-header">
                <div className={`booking-status ${type}`}>{type === 'assigned' ? 'New Assignment' : 'Confirmed'}</div>
                <div className="booking-fare">₹{Math.round(booking.orderId.driverShare.driverCut)}</div>
            </div>

            <div className="booking-route">
                <div className="route-point pickup">
                    <div className="route-dot"></div>
                    <span>{booking.orderId.pickupLocation}</span>
                </div>
                <div className="route-line"></div>
                <div className="route-point destination">
                    <div className="route-dot"></div>
                    <span>{booking.orderId.destination}</span>
                </div>
            </div>

            <div className="booking-footer">
                <div className="booking-time">
                    <FaCalendarAlt />
                    {date.formatDate(booking.departureDate)}
                </div>

                <div className="booking-actions">
                    {type === 'assigned' ? (
                        <>
                            <button
                                className={`booking-action accept ${isAcceptLoading ? 'loading' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnyLoading && !hasError) {
                                        onAccept && onAccept(booking);
                                    }
                                }}
                                disabled={isAnyLoading || hasError}>
                                {isAcceptLoading ? (
                                    <>
                                        <div className="button-spinner"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck />
                                        Accept
                                    </>
                                )}
                            </button>
                            <button
                                className={`booking-action cancel ${isCancelLoading ? 'loading' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnyLoading && !hasError) {
                                        onCancel && onCancel(booking);
                                    }
                                }}
                                disabled={isAnyLoading || hasError}>
                                {isCancelLoading ? (
                                    <>
                                        <div className="button-spinner"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaTimes />
                                        Cancel
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            className={`booking-action complete ${isCompleteLoading ? 'loading' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isCompleteLoading && !hasError) {
                                    onComplete && onComplete(booking);
                                }
                            }}
                            disabled={isCompleteLoading || hasError}>
                            {isCompleteLoading ? (
                                <>
                                    <div className="button-spinner"></div>
                                    Completing...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle />
                                    Complete
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

BookingCard.propTypes = {
    booking: PropTypes.shape({
        departureDate: PropTypes.string.isRequired,
        orderId: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            pickupLocation: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            driverShare: PropTypes.shape({
                driverCut: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    }).isRequired,

    type: PropTypes.oneOf(['assigned', 'confirmed']).isRequired,

    // Callback handlers
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    onComplete: PropTypes.func,
    onViewDetails: PropTypes.func,

    // State flags (optional, defaulted in component)
    isConfirming: PropTypes.bool,
    isCancelling: PropTypes.bool,
    isCompleting: PropTypes.bool,
    confirmingError: PropTypes.bool,
    cancellingError: PropTypes.bool,
    completingError: PropTypes.bool
};

const TransactionCard = ({ transaction }) => {
    const isCredit = transaction.type === 'credit';

    return (
        <motion.div
            className="transaction-card"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}>
            <div className="transaction-icon">
                <FaExchangeAlt className={isCredit ? 'credit' : 'debit'} />
            </div>
            <div className="transaction-details">
                <div className="transaction-type">{transaction.description}</div>
                <div className="transaction-date">{new Date(transaction.transactionDate).toLocaleDateString()}</div>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
                {isCredit ? '+' : '-'}₹{transaction.amount}
            </div>
        </motion.div>
    );
};
TransactionCard.propTypes = {
    transaction: PropTypes.shape({
        type: PropTypes.oneOf(['credit', 'debit']).isRequired,
        amount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        transactionDate: PropTypes.string.isRequired
    }).isRequired
};
export default DriverDashboard;
