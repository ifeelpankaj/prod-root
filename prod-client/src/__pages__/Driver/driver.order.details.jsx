// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetailQuery } from '../../__redux__/api/order.api';
import { DriverDetails, JourneySection, PassengersSection } from '../../__components__/cards/order.detail.card';
import { FaCreditCard, FaRupeeSign } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DriverOrderDetails = () => {
    const { id } = useParams();
    const {
        data: orderDetail,
        isLoading: orderLoading,
        isError: orderError
    } = useOrderDetailQuery(id, {
        refetchOnReconnect: true
    });

    if (orderError) {
        return (
            <div className="booking_booking-detail">
                <div className="error-state">
                    <h2>Unable to load order details</h2>
                    <p>Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <SkeletonTheme
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb">
            <div className="booking_booking-detail">
                <h1 className="booking_booking-detail__title">
                    {orderLoading ? (
                        <Skeleton
                            width={250}
                            height={32}
                        />
                    ) : (
                        'Your Journey Details'
                    )}
                </h1>

                <JourneySection
                    order={orderDetail}
                    isLoading={orderLoading}
                />

                <PassengersSection
                    passangerInfo={orderDetail}
                    isLoading={orderLoading}
                />

                <div className="d_p_container">
                    <div className="d_p_card d_p_earning">
                        <div className="d_p_icon-wrapper">
                            {orderLoading ? (
                                <Skeleton
                                    circle
                                    width={48}
                                    height={48}
                                />
                            ) : (
                                <FaRupeeSign className="d_p_icon" />
                            )}
                        </div>
                        <div className="d_p_content">
                            <h2 className="d_p_title">
                                {orderLoading ? (
                                    <Skeleton
                                        width={120}
                                        height={20}
                                    />
                                ) : (
                                    'Your Earning'
                                )}
                            </h2>
                            <p className="d_p_amount">
                                {orderLoading ? (
                                    <Skeleton
                                        width={80}
                                        height={28}
                                    />
                                ) : (
                                    `₹${orderDetail?.driverShare?.driverCut.toFixed(2)}`
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="d_p_card d_p_order-type">
                        <div className="d_p_icon-wrapper">
                            {orderLoading ? (
                                <Skeleton
                                    circle
                                    width={48}
                                    height={48}
                                />
                            ) : (
                                <FaCreditCard className="d_p_icon" />
                            )}
                        </div>
                        <div className="d_p_content">
                            <h2 className="d_p_title">
                                {orderLoading ? (
                                    <Skeleton
                                        width={100}
                                        height={20}
                                    />
                                ) : (
                                    'Order Type'
                                )}
                            </h2>
                            <p className="d_p_type">
                                {orderLoading ? (
                                    <Skeleton
                                        width={70}
                                        height={24}
                                    />
                                ) : orderDetail?.paymentMethod === 'Hybrid' ? (
                                    'Postpaid'
                                ) : (
                                    'Prepaid'
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <DriverDetails
                    orderDetail={orderDetail}
                    isLoading={orderLoading}
                    isDriver={true}
                />
            </div>
        </SkeletonTheme>
    );
};

export default DriverOrderDetails;
