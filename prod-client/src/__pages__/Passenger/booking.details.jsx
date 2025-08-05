import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useOrderDetailQuery } from '../../__redux__/api/order.api';

import MessageDisplay from '../../__components__/message.display';
import { CabDetails, DriverDetails, JourneySection, PassengersSection, PaymentSection } from '../../__components__/cards/order.detail.card';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Define SkeletonLoader outside the component to avoid re-creation on every render
const SkeletonLoader = () => (
    <SkeletonTheme
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb">
        <div className="booking_booking-detail">
            {/* Title Skeleton */}
            <Skeleton
                height={32}
                style={{ marginBottom: '24px' }}
            />

            {/* Journey Section Skeleton */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton
                    height={20}
                    width="60%"
                    style={{ marginBottom: '12px' }}
                />
                <Skeleton
                    height={80}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            {/* Passengers Section Skeleton */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton
                    height={20}
                    width="50%"
                    style={{ marginBottom: '12px' }}
                />
                <Skeleton
                    height={60}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            {/* Cab Details Skeleton */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton
                    height={20}
                    width="45%"
                    style={{ marginBottom: '12px' }}
                />
                <Skeleton
                    height={100}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            {/* Payment Section Skeleton */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton
                    height={20}
                    width="55%"
                    style={{ marginBottom: '12px' }}
                />
                <Skeleton
                    height={70}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            {/* Driver Details Skeleton */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton
                    height={20}
                    width="50%"
                    style={{ marginBottom: '12px' }}
                />
                <Skeleton
                    height={90}
                    style={{ borderRadius: '8px' }}
                />
            </div>
        </div>
    </SkeletonTheme>
);
const BookingDetails = () => {
    const { id } = useParams();
    const { data: orderDetail, isLoading: orderLoading } = useOrderDetailQuery(id);
    const [showError, setShowError] = useState(false);

    React.useEffect(() => {
        let timer;

        if (!orderDetail) {
            timer = setTimeout(() => {
                setShowError(true);
            }, 800);
        } else {
            setShowError(false);
        }

        return () => clearTimeout(timer);
    }, [orderDetail, orderLoading]);

    // Show skeleton before error
    if (!orderDetail && !orderLoading && !showError) {
        return <SkeletonLoader />;
    }

    // Show error message after 8ms delay
    if (!orderDetail && showError) {
        return (
            <MessageDisplay
                message="Booking details not found"
                type="error"
            />
        );
    }

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
                cab={orderDetail?.bookedCab}
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
