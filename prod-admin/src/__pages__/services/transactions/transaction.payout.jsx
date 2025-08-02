import React from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import PropTypes from 'prop-types';
import { useGetTransactionDetailsQuery, useReleasePayoutMutation } from '../../../__redux__/api/transaction.api';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';
import { formatDate } from '../../../__utils__/date.utils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const TransactionInfo = ({ transaction, loading }) => {
    if (loading) {
        return (
            <div className="dov_ver_info_section">
                <StylishLoader
                    color="yellow"
                    size="large"
                />
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="dov_ver_info_section">
                <MessageDisplay
                    type="error"
                    message="There is some error in fetching info.."
                />
            </div>
        );
    }

    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Transaction Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Id:</label>
                    <span className="dov_ver_value">{transaction._id}</span>
                </div>

                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Amount To Be Paid:</label>
                    <span className="dov_ver_value">₹ {Math.round(transaction.amount)}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Description:</label>
                    <span className="dov_ver_value">{transaction.description}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Total Booking Amount:</label>
                    <span className="dov_ver_value">₹ {transaction.orderId.bookingAmount}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Transaction Date:</label>
                    <span className="dov_ver_value">
                        {transaction.transactionDate === transaction.createdAt ? 'Not Yet Paid' : `${formatDate(transaction.transactionDate)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};
TransactionInfo.propTypes = {
    transaction: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        amount: PropTypes.number,
        transactionDate: PropTypes.string,
        description: PropTypes.string,
        orderId: PropTypes.shape({
            _id: PropTypes.string,
            bookingAmount: PropTypes.number,
            driverShare: PropTypes.shape({
                _id: PropTypes.string,
                Via: PropTypes.string,
                status: PropTypes.string
            })
        })
    }),
    loading: PropTypes.bool.isRequired
};

const PayoutActions = ({ payoutHandler, loading, transaction }) => {
    const isPaid = !transaction?.isPending;

    return (
        <div className="dov_ver_verification_actions">
            <h2 className="dov_ver_section_title">Payout Actions</h2>
            <div className="dov_ver_actions_grid">
                {!isPaid ? (
                    <button
                        className="dov_ver_btn dov_ver_btn_approve"
                        onClick={payoutHandler}
                        type="button"
                        disabled={loading}>
                        {loading ? 'Processing Payment...' : 'Release Payment'}
                    </button>
                ) : (
                    <div className="dov_ver_paid_status">
                        <span className="dov_ver_verified">✅ Payment has been processed successfully</span>
                    </div>
                )}
            </div>
        </div>
    );
};

PayoutActions.propTypes = {
    payoutHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    transaction: PropTypes.object
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}>
            <div
                className="modal-content"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '24px',
                    minWidth: '300px',
                    maxWidth: '500px',
                    width: '90%',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                <h3
                    className="modal-title"
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#333',
                        textAlign: 'center'
                    }}>
                    {title}
                </h3>
                <p
                    className="modal-message"
                    style={{
                        margin: '0 0 24px 0',
                        fontSize: '16px',
                        color: '#666',
                        lineHeight: '1.5',
                        textAlign: 'center'
                    }}>
                    {message}
                </p>
                <div
                    className="modal-actions"
                    style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end'
                    }}>
                    <button
                        className="modal-btn modal-btn-cancel"
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#666',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                            transition: 'all 0.2s ease',
                            ':hover': {
                                backgroundColor: '#f5f5f5',
                                borderColor: '#ccc'
                            }
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = '#f5f5f5';
                                e.target.style.borderColor = '#ccc';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#ddd';
                            }
                        }}>
                        Cancel
                    </button>
                    <button
                        className="modal-btn modal-btn-confirm"
                        onClick={onConfirm}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = '#0056b3';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = '#007bff';
                            }
                        }}>
                        {loading ? 'Processing...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

const TransactionPayout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPayoutModal, setShowPayoutModal] = React.useState(false);
    // API hooks
    const { data: details, isLoading, isError, error: fetchError, refetch } = useGetTransactionDetailsQuery(id);

    const [payout, { isLoading: payoutLoading, isError: payoutMutationError, error: payoutError }] = useReleasePayoutMutation();

    const loading = isLoading || !details;

    const validateTransactionForPayout = (transaction) => {
        if (!transaction) {
            throw new Error('Transaction data not found');
        }

        if (!transaction.isPending) {
            throw new Error('Transaction is already processed');
        }

        if (!transaction.amount || transaction.amount <= 0) {
            throw new Error('Invalid transaction amount');
        }

        if (!transaction.orderId) {
            throw new Error('Order information not found');
        }

        return true;
    };
    const handlePayout = async () => {
        try {
            // Validate transaction
            validateTransactionForPayout(details);

            const payoutData = {
                transactionId: id,
                amount: details.amount,
                orderId: details.orderId._id
            };

            toast.info('Initiating payout with data:', payoutData);

            const result = await payout(payoutData).unwrap();

            toast.success(result.message);

            refetch();
            setShowPayoutModal(false);
        } catch (error) {
            const errorMessage = error?.data?.message || error?.message || 'Failed to process payment. Please try again.';

            toast.error(errorMessage);
        }
    };

    const handleGoBack = () => {
        navigate(`/admin/transaction/${id}`);
    };
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
                    <main>
                        <div className="admin-loading-container">
                            <StylishLoader
                                size="large"
                                color="green"
                            />
                            <p>Loading transaction details...</p>
                        </div>
                    </main>
                ) : isError ? (
                    <div className="admin-error-container">
                        <MessageDisplay
                            type="error"
                            message={fetchError?.data?.message || 'Currently we are unable to show transaction details'}
                        />
                        <button
                            className="dov_ver_btn dov_ver_btn_approve"
                            onClick={handleGoBack}>
                            Go Back
                        </button>
                    </div>
                ) : (
                    <section className="admin_driver_driver-details">
                        <div className="driver-header">
                            <h1 className="dov_ver_main_title">Transaction Overview</h1>
                            <div className="dov_ver_verification_status">
                                <span className={`dov_ver_status_badge ${details.isPending === true ? 'dov_ver_pending' : 'dov_ver_verified'}`}>
                                    {details.isPending === true ? 'Not Paid' : 'Paid'}
                                </span>
                            </div>
                        </div>
                        {/* Transaction Details */}
                        <TransactionInfo
                            transaction={details}
                            loading={isLoading}
                        />
                        {/* Payout Actions */}
                        <PayoutActions
                            payoutHandler={() => setShowPayoutModal(true)}
                            loading={payoutLoading}
                            transaction={details}
                        />
                        {payoutMutationError && (
                            <div className="error-message">
                                <MessageDisplay
                                    type="error"
                                    message={payoutError?.data?.message || 'Payout failed'}
                                />
                            </div>
                        )}
                    </section>
                )}
                {/* Payout Confirmation Modal */}
                <ConfirmationModal
                    isOpen={showPayoutModal}
                    onClose={() => setShowPayoutModal(false)}
                    onConfirm={handlePayout}
                    title="Confirm Payment Release"
                    message={`Are you sure you want to release payment of ₹${details?.amount} for this transaction?`}
                    loading={payoutLoading}
                />
            </main>
        </div>
    );
};

export default TransactionPayout;
