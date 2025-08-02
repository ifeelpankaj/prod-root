// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminSidebar from '../../../../__components__/adminSidebar';
import { useGetOrderByIdQuery } from '../../../../__redux__/api/order.api';
import { useParams } from 'react-router-dom';
import StylishLoader from '../../../../__components__/loader';
import MessageDisplay from '../../../../__components__/messageDisplay';
import { formatDate } from '../../../../__utils__/date.utils';
import PropTypes from 'prop-types';

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
        numberOfPassengers: PropTypes.number
    }),
    loading: PropTypes.bool.isRequired
};

const CabInformation = ({ cab, loading }) => {
    if (loading) {
        return (
            <div className="dov_ver_info_section">
                <StylishLoader
                    color="black"
                    size="large"
                />
            </div>
        );
    }

    if (!cab) {
        return (
            <div className="dov_ver_info_section">
                <h2 className="dov_ver_section_title">Cab Information</h2>
                <MessageDisplay
                    type="info"
                    message="No cab information available for this driver."
                />
            </div>
        );
    }

    return (
        <div className="dov_ver_info_section">
            <h2 className="dov_ver_section_title">Cab Information</h2>
            <div className="dov_ver_cab_details">
                <div className="dov_ver_info_grid">
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Cab Number:</label>
                        <span className="dov_ver_value">{cab.cabNumber}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Model:</label>
                        <span className="dov_ver_value">{cab.modelName}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Capacity:</label>
                        <span className="dov_ver_value">{cab.capacity} passengers</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Features:</label>
                        <span className="dov_ver_value">{cab.feature}</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Rate:</label>
                        <span className="dov_ver_value">₹{cab.rate}/km</span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Availability:</label>
                        <span className={`dov_ver_value ${cab.availability === 'Available' ? 'dov_ver_success' : 'dov_ver_warning'}`}>
                            {cab.availability}
                        </span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Ready Status:</label>
                        <span className={`dov_ver_value ${cab.isReady ? 'dov_ver_success' : 'dov_ver_danger'}`}>
                            {cab.isReady ? 'Ready' : 'Not Ready'}
                        </span>
                    </div>
                    <div className="dov_ver_info_item">
                        <label className="dov_ver_label">Upcoming Bookings:</label>
                        <span className="dov_ver_value">{cab.upcomingBookings?.length || 0}</span>
                    </div>
                </div>

                {/* Cab Photos */}
                {cab.photos && cab.photos.length > 0 && (
                    <div className="dov_ver_cab_photos">
                        <h3 className="dov_ver_subsection_title">Cab Photos</h3>
                        <div className="dov_ver_photos_grid">
                            {cab.photos.map((photo, index) => (
                                <div
                                    key={photo._id}
                                    className="dov_ver_photo_item">
                                    <img
                                        src={photo.url}
                                        alt={`Cab photo ${index + 1}`}
                                        className="dov_ver_cab_photo"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
CabInformation.propTypes = {
    cab: PropTypes.shape({
        cabNumber: PropTypes.string,
        modelName: PropTypes.string,
        capacity: PropTypes.number,
        feature: PropTypes.string,
        rate: PropTypes.number,
        availability: PropTypes.string,
        isReady: PropTypes.bool,
        upcomingBookings: PropTypes.array,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                url: PropTypes.string
            })
        )
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

const DriverInfo = ({ order, loading }) => {
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

    const driver = order?.driverId;
    if (!order || !driver) {
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
            <h2 className="dov_ver_section_title">Driver Information</h2>
            <div className="dov_ver_info_grid">
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Id:</label>
                    <span className="dov_ver_value">{driver._id}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Email:</label>
                    <span className="dov_ver_value"> {driver.email}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Cell No:</label>
                    <span className="dov_ver_value"> {driver.phoneNumber}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Earning:</label>
                    <span className="dov_ver_value">₹ {order.driverShare.driverCut}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Payment Method:</label>
                    <span className="dov_ver_value">{order.driverShare.Via}</span>
                </div>
                <div className="dov_ver_info_item">
                    <label className="dov_ver_label">Driver Payment Status:</label>
                    <span className="dov_ver_value">{order.driverShare.status}</span>
                </div>
            </div>
        </div>
    );
};
DriverInfo.propTypes = {
    order: PropTypes.shape({
        driverId: PropTypes.shape({
            _id: PropTypes.string,
            email: PropTypes.string,
            phoneNumber: PropTypes.number
        }),
        driverShare: PropTypes.shape({
            driverCut: PropTypes.number,
            Via: PropTypes.string,
            status: PropTypes.string
        })
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

const OrderDetails = () => {
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
                        color="blue"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Currently we have no booking data. Please try again later."
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

                        {/*  */}
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
                        {/* Driver Info */}
                        <DriverInfo
                            order={orderDetail}
                            loading={isLoading}
                        />

                        {/* Booked Cab info */}
                        <CabInformation
                            cab={orderDetail?.bookedCab}
                            loading={isLoading}
                        />
                    </section>
                )}
            </main>
        </div>
    );
};

export default OrderDetails;
