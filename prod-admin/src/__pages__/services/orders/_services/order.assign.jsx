// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminSidebar from '../../../../__components__/adminSidebar';
import StylishLoader from '../../../../__components__/loader';
import MessageDisplay from '../../../../__components__/messageDisplay';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../__utils__/date.utils';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../../__redux__/api/order.api';
import AvaliableCabDisplay from '../../../../__components__/cab.avaliable';
const OrderInfo = ({ order, loading }) => {
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

    if (!order) {
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
            <h2 className="dov_ver_section_title">Order Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Id:</label>
                    <span className="dov_ver_value">{order._id}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Placed Date:</label>
                    <span className="dov_ver_value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Pickup Location:</label>
                    <span className="dov_ver_value">{order.pickupLocation}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">DropOff Location:</label>
                    <span className="dov_ver_value">{order.destination}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Departure Date:</label>
                    <span className="dov_ver_value">{formatDate(order.departureDate)}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">DropOff Date:</label>
                    <span className="dov_ver_value">{formatDate(order.dropOffDate)}</span>
                </div>

                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Booking Type:</label>
                    <span className={`dov_ver_value`}>{order.bookingType}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Passenger Count:</label>
                    <span className="dov_ver_value">{order.numberOfPassengers}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Capacity:</label>
                    <span className="dov_ver_value">{order.bookedCab.capacity} Seater</span>
                </div>
            </div>
        </div>
    );
};
OrderInfo.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        pickupLocation: PropTypes.string,
        destination: PropTypes.string,
        departureDate: PropTypes.string,
        dropOffDate: PropTypes.string,
        bookingType: PropTypes.string,
        numberOfPassengers: PropTypes.number,
        bookedCab: PropTypes.shape({
            capacity: PropTypes.number
        })
    }),
    loading: PropTypes.bool.isRequired
};
const PaymentInfo = ({ order, loading }) => {
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

    if (!order) {
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
            <h2 className="dov_ver_section_title">Payment Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Razorpay Id:</label>
                    <span className="dov_ver_value">{order.razorpayOrderId}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Booking Amount:</label>
                    <span className="dov_ver_value">₹ {order.bookingAmount}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Paid Amount:</label>
                    <span className="dov_ver_value">₹ {order.paidAmount}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Payment Method:</label>
                    <span className="dov_ver_value">{order.paymentMethod}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Payment Status:</label>
                    <span className="dov_ver_value">{order.paymentStatus}</span>
                </div>
            </div>
        </div>
    );
};
PaymentInfo.propTypes = {
    order: PropTypes.shape({
        razorpayOrderId: PropTypes.string,
        bookingAmount: PropTypes.number,
        paidAmount: PropTypes.number,
        paymentMethod: PropTypes.string,
        paymentStatus: PropTypes.string
    }),
    loading: PropTypes.bool.isRequired
};
const UserInfo = ({ order, loading }) => {
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

    if (!order) {
        return (
            <div className="dov_ver_info_section">
                <MessageDisplay
                    type="error"
                    message="There is some error in fetching info.."
                />
            </div>
        );
    }
    const user = order?.userId;
    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Customer Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Customer Id:</label>
                    <span className="dov_ver_value">{user._id}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Customer Email:</label>
                    <span className="dov_ver_value"> {user.email}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Customer Cell No:</label>
                    <span className="dov_ver_value"> {user.phoneNumber}</span>
                </div>
            </div>
        </div>
    );
};
UserInfo.propTypes = {
    order: PropTypes.shape({
        userId: PropTypes.shape({
            _id: PropTypes.string,
            email: PropTypes.string,
            phoneNumber: PropTypes.number
        })
    }),
    loading: PropTypes.bool.isRequired
};

const OrderAssignment = () => {
    const { id } = useParams();

    const { data: orderDetail, isLoading, isError } = useGetOrderByIdQuery(id);

    const loading = isLoading || !orderDetail;
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="red"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Error to load your order.Please try again later "
                    />
                ) : (
                    <section className="admin_driver_driver-details">
                        <div className="driver-header">
                            <h1 className="dov_ver_main_title">Order Overview</h1>
                            <div className="dov_ver_verification_status">
                                <span
                                    className={`dov_ver_status_badge ${orderDetail.bookingStatus === 'Confirmed' ? 'dov_ver_verified' : 'dov_ver_pending'}`}>
                                    {orderDetail?.bookingStatus}
                                </span>
                            </div>
                        </div>
                        <OrderInfo
                            order={orderDetail}
                            loading={isLoading}
                        />
                        {/* User Info */}
                        <UserInfo
                            order={orderDetail}
                            loading={isLoading}
                        />
                        {/* Payment Info */}
                        <PaymentInfo
                            order={orderDetail}
                            loading={isLoading}
                        />
                        <AvaliableCabDisplay
                            capacity={orderDetail.bookedCab.capacity}
                            departureDate={orderDetail.departureDate}
                            dropOffDate={orderDetail.dropOffDate}
                        />
                    </section>
                )}
            </main>
        </div>
    );
};

export default OrderAssignment;
