/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import TableHOC from '../../../__components__/tableHOC';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../__utils__/date.utils';
import { useFetchAllOrdersQuery } from '../../../__redux__/api/admin.api';
import MessageDisplay from '../../../__components__/messageDisplay';

import AdminSidebar from '../../../__components__/adminSidebar';
import Skeleton from 'react-loading-skeleton';

const columns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Status',
        accessor: 'status'
    },
    {
        Header: 'Departure Date',
        accessor: 'departureDate'
    },
    {
        Header: 'Booking Type',
        accessor: 'type'
    },
    {
        Header: 'User Name',
        accessor: 'belongTo'
    },
    {
        Header: 'Placed At',
        accessor: 'createdAt'
    },
    {
        Header: 'Booking Amount',
        accessor: 'bookingAmount'
    },
    // {
    //     Header: 'Paid Amount',
    //     accessor: 'paidAmount'
    // },
    {
        Header: 'Payment',
        accessor: 'paymentType'
    },
    {
        Header: 'Action',
        accessor: 'action'
    }
];
const CompletedOrder = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const bookingStatus = 'Completed';
    const { data: adminOrders, isLoading: ordersLoading, isError } = useFetchAllOrdersQuery({ page, limit, bookingStatus });

    const [rows, setRows] = useState([]);
    React.useEffect(() => {
        if (adminOrders?.data && Array.isArray(adminOrders.data)) {
            setRows(
                adminOrders.data.map((booking) => ({
                    id: booking._id || 'N/A',
                    status: booking.bookingStatus || 'N/A',
                    departureDate: formatDate(booking.departureDate),
                    type: booking.bookingType,
                    belongTo: booking.userId.username,
                    createdAt: formatDate(booking.createdAt),
                    bookingAmount: booking.bookingAmount,
                    paidAmount: booking.paidAmount,
                    paymentType: booking.paymentStatus,
                    action: <Link to={`/admin/order/${booking._id}`}>Manage</Link>
                }))
            );
        }
    }, [adminOrders]);
    const paginationInfo = {
        currentPage: page,
        totalPages: adminOrders?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (adminOrders?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Completed Bookings', true, paginationInfo)();

    return (
        <div className="admin-container">
            <AdminSidebar />

            <main>
                {ordersLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '100vh',
                            width: '100%'
                        }}>
                        <div
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                width: '100%'
                                // maxWidth: '600px'
                            }}>
                            <Skeleton
                                height={40}
                                width="100%"
                            />
                            {[...Array(6)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    height={50}
                                    width="100%"
                                />
                            ))}
                        </div>
                    </div>
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Currently we have no booking data. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
        </div>
    );
};

export default CompletedOrder;
