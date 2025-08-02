/* eslint-disable react/self-closing-comp */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { date } from '../../__utils__/date.utils';

const OrderCard = ({ order, driver = false }) => {
    const formattedDate = date.formatShortDate(order.createdAt, false);

    return (
        <div className="order_order-card">
            <div className="order_order-header">
                {driver ? (
                    <span className={`status-${order.bookingStatus.toLowerCase()}`}>{order?.driverShare?.status}</span>
                ) : (
                    <span className={`status-${order.bookingStatus.toLowerCase()}`}>{order.bookingStatus}</span>
                )}
                <h3>{order.bookingType}</h3>
            </div>
            <div className="order_order-body">
                <div className="order_order-route">
                    <div className="order_location from">{order.exactLocation ? order.exactLocation : order.pickupLocation}</div>
                    <div className="order_route-line"></div>
                    <div className="order_location to">{order.destination}</div>
                </div>
                <div className="order_order-details">
                    <p className="order_date"> 📅{formattedDate}</p>
                    <p className="order_id">Booking ID ➡️ {order._id}</p>
                    <p className="order_payment">💸 {order.paymentMethod}</p>
                </div>
                <div className="order_order-amount">
                    {driver ? (
                        <p className="order_total">Earning: ₹{order?.driverShare?.driverCut}</p>
                    ) : (
                        <p className="total">Total: ₹{order.bookingAmount}</p>
                    )}
                    {driver ? (
                        <p className="order_paid">Paid Via: ₹{order?.driverShare?.Via}</p>
                    ) : (
                        <p className="order_paid">Paid: ₹{order.paidAmount}</p>
                    )}
                </div>
            </div>
            {driver ? (
                <Link
                    className="order_detail-button"
                    to={`/driver-order/${order._id}`}>
                    View Details
                </Link>
            ) : (
                <Link
                    className="order_detail-button"
                    to={`/booking/${order._id}`}>
                    View Details
                </Link>
            )}
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        bookingStatus: PropTypes.string.isRequired,
        bookingType: PropTypes.string.isRequired,
        exactLocation: PropTypes.string,
        pickupLocation: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        bookingAmount: PropTypes.number.isRequired,
        paidAmount: PropTypes.number.isRequired,
        driverShare: PropTypes.shape({
            status: PropTypes.string,
            driverCut: PropTypes.number,
            Via: PropTypes.string
        })
    }).isRequired,
    driver: PropTypes.bool
};

export default OrderCard;
