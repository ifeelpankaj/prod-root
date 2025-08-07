/* eslint-disable react/no-array-index-key */
import React from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import MessageDisplay from '../../../__components__/messageDisplay';
import TableHOC from '../../../__components__/tableHOC';
import { useParams } from 'react-router-dom';
import { useFetchupcomingBookingsQuery } from '../../../__redux__/api/cab.api';
import Skeleton from 'react-loading-skeleton';

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
const CabUpcommingBooking = () => {
    const { id } = useParams();
    const [page, setPage] = React.useState(1);
    const limit = 6;

    const { data: orders, isLoading, isError } = useFetchupcomingBookingsQuery({ id, page, limit });
    const [rows, setRows] = React.useState([]);
    const loading = isLoading || !orders;

    React.useEffect(() => {
        if (orders?.data && Array.isArray(orders.data)) {
            setRows(
                orders.data.map((booking) => ({
                    bookingStatus: <span className={`status ${booking.bookingStatus.toLowerCase()}`}>{booking.bookingStatus}</span>,
                    pickupLocation: booking.pickupLocation.length > 50 ? `${booking.pickupLocation.substring(0, 50)}...` : booking.pickupLocation,
                    destination: booking.destination.length > 50 ? `${booking.destination.substring(0, 50)}...` : booking.destination,
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
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cab Booking History', true, paginationInfo)();
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {loading ? (
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
                        message="Failed to load cab booking history. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
        </div>
    );
};

export default CabUpcommingBooking;
