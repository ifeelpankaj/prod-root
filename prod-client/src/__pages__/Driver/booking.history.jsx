/* eslint-disable react/no-array-index-key */
import React from 'react';
import OrderCard from '../../__components__/cards/order.card';
import MessageDisplay from '../../__components__/message.display';

import { useDriverCompletedBookingQuery } from '../../__redux__/api/driver.api';
import PaginationControls from '../../__components__/pagination';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton component for OrderCard
const OrderCardSkeleton = () => (
    <div
        className="order-card-skeleton"
        style={{
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1rem',
            background: 'white'
        }}>
        <div style={{ marginBottom: '0.75rem' }}>
            <Skeleton
                height={20}
                width="60%"
            />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
            <Skeleton
                height={16}
                width="40%"
            />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
            <Skeleton
                height={16}
                width="80%"
            />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton
                height={16}
                width="30%"
            />
            <Skeleton
                height={32}
                width={80}
                borderRadius={6}
            />
        </div>
    </div>
);

const DriverCompletedBooking = () => {
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(5);

    const { data: orderData, isLoading, isError } = useDriverCompletedBookingQuery({ page, limit });

    if (isError || (!isLoading && !orderData)) {
        return (
            <MessageDisplay
                message="No Order Found"
                type="error"
            />
        );
    }

    const { data: orders, pagination } = orderData || {};

    return (
        <div>
            <SkeletonTheme
                baseColor="#f3f4f6"
                highlightColor="#e5e7eb">
                {isLoading ? (
                    <div className="booking_container">
                        {/* Render skeleton cards based on limit */}
                        {Array.from({ length: limit }).map((_, index) => (
                            <OrderCardSkeleton key={index} />
                        ))}

                        {/* Skeleton for pagination */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1.5rem',
                                margin: '2rem 0'
                            }}>
                            <Skeleton
                                height={40}
                                width={100}
                                borderRadius={8}
                            />
                            <Skeleton
                                height={20}
                                width={120}
                            />
                            <Skeleton
                                height={40}
                                width={100}
                                borderRadius={8}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="booking_container">
                            {orders?.map((order) => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                    driver={true}
                                />
                            ))}
                        </div>
                        <PaginationControls
                            currentPage={page}
                            totalPages={pagination?.totalPages || 1}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </SkeletonTheme>
        </div>
    );
};

export default DriverCompletedBooking;
