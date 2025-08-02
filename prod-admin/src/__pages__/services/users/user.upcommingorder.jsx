import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserUpcommingBookingsQuery } from '../../../__redux__/api/auth.api';
import TableHOC from '../../../__components__/tableHOC';
import AdminSidebar from '../../../__components__/adminSidebar';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';
const columns = [
    {
        Header: 'Booking Status',
        accessor: 'bookingStatus'
    },
    {
        Header: 'Pickup Location',
        accessor: 'pickupLocation'
    },
    {
        Header: 'Destination',
        accessor: 'destination'
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
        Header: 'Amount',
        accessor: 'bookingAmount'
    }
];
const UserUpcommingOrder = () => {
    const { id } = useParams();
    const [page, setPage] = React.useState(1);
    const limit = 6;
    const word_length = 50;
    const { data: orders, isLoading, isError } = useGetUserUpcommingBookingsQuery({ id, page, limit });
    const [rows, setRows] = React.useState([]);
    const loading = isLoading || !orders;
    React.useEffect(() => {
        if (orders?.data && Array.isArray(orders.data)) {
            setRows(
                orders.data.map((booking) => ({
                    bookingStatus: <span className={`status ${booking.bookingStatus.toLowerCase()}`}>{booking.bookingStatus}</span>,
                    pickupLocation:
                        booking.pickupLocation.length > word_length
                            ? `${booking.pickupLocation.substring(0, word_length)}...`
                            : booking.pickupLocation,
                    destination:
                        booking.destination.length > word_length ? `${booking.destination.substring(0, word_length)}...` : booking.destination,
                    departureDate: new Date(booking.departureDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    type: booking.bookingType,
                    bookingAmount: `₹${booking.bookingAmount}`
                }))
            );
        }
    }, [orders]);
    const paginationInfo = {
        currentPage: page,
        totalPages: orders?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (orders?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'User Upcomming Booking', true, paginationInfo)();
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="cyan"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Failed to load user upcomming bookings. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
        </div>
    );
};

export default UserUpcommingOrder;
