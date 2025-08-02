import React, { useState } from 'react';
import { formatDate } from '../../../__utils__/date.utils';
import { Link } from 'react-router-dom';
import TableHOC from '../../../__components__/tableHOC';
import AdminSidebar from '../../../__components__/adminSidebar';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';
import { useFetchAllOrdersQuery } from '../../../__redux__/api/admin.api';

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
const CancelledOrder = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const bookingStatus = 'Cancelled';
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
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cancelled Bookings', true, paginationInfo)();

    return (
        <div className="admin-container">
            <AdminSidebar />

            <main>
                {ordersLoading ? (
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
                    Table
                )}
            </main>
        </div>
    );
};

export default CancelledOrder;
