// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetailQuery } from '../../__redux__/api/order.api';

import MessageDisplay from '../../__components__/message.display';
import { CabDetails, DriverDetails, JourneySection, PassengersSection, PaymentSection } from '../../__components__/cards/order.detail.card';

const BookingDetails = () => {
    const { id } = useParams();
    const { data: orderDetail, isLoading: orderLoading } = useOrderDetailQuery(id);

    // Check if order data exists
    if (!orderDetail) {
        return (
            <MessageDisplay
                message="Booking details not found"
                type="error"
            />
        );
    }
    const { bookedCab: cabdetails } = orderDetail;

    return (
        <div className="booking_booking-detail">
            <h1 className="booking_booking-detail__title">Your Journey Details</h1>

            <JourneySection
                order={orderDetail}
                isLoading={orderLoading} // Order is already loaded at this point
            />
            <PassengersSection
                passangerInfo={orderDetail}
                isLoading={orderLoading} // Order is already loaded at this point
            />
            <CabDetails
                cab={cabdetails}
                isLoading={orderLoading}
            />
            <PaymentSection
                paymentInfo={orderDetail}
                isLoading={orderLoading}
            />
            <DriverDetails
                orderDetail={orderDetail}
                isLoading={orderLoading}
            />
        </div>
    );
};

export default BookingDetails;
