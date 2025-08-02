// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTransactionDetailsQuery } from '../../../__redux__/api/transaction.api';
import AdminSidebar from '../../../__components__/adminSidebar';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';
import { formatDate } from '../../../__utils__/date.utils';
import PropTypes from 'prop-types';
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
                    <label className="dov_ver_label">Payout ID:</label>
                    <span className="dov_ver_value">{transaction.payoutId}</span>
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
                    <label className="dov_ver_label">For Order Id:</label>
                    <span className="dov_ver_value">{transaction.orderId._id}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Paid Via:</label>
                    <span className="dov_ver_value">{transaction.orderId.driverShare.Via}</span>
                </div>

                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Share Status:</label>
                    <span className={`dov_ver_value`}>{transaction.orderId.driverShare.status}</span>
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
        payoutId: PropTypes.string,
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
const TransactionDetials = () => {
    const { id } = useParams();

    const { data: details, isLoading, isError } = useGetTransactionDetailsQuery(id);
    const loading = isLoading || !details;

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="green"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Currently we are unable to show transaction details"
                    />
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
                    </section>
                )}
            </main>
        </div>
    );
};

export default TransactionDetials;
