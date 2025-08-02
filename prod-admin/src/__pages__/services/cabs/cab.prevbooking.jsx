import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminSidebar from '../../../__components__/adminSidebar';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';
import TableHOC from '../../../__components__/tableHOC';
import { useFetchCabBookingHistoryQuery } from '../../../__redux__/api/cab.api';

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
        Header: 'Completed Date',
        accessor: 'completedDate'
    },
    {
        Header: 'Amount',
        accessor: 'bookingAmount'
    }
];

const CabHistory = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data: cabdata, isLoading, isError } = useFetchCabBookingHistoryQuery({ id, page, limit });
    const [rows, setRows] = useState([]);

    React.useEffect(() => {
        if (cabdata?.data && Array.isArray(cabdata.data)) {
            setRows(
                cabdata.data.map((booking) => ({
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
                    completedDate:
                        booking.bookingStatus === 'Completed'
                            ? new Date(booking.createdAt).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                              })
                            : '-',
                    bookingAmount: `₹${booking.bookingAmount}`
                }))
            );
        }
    }, [cabdata]);

    const loading = isLoading || !cabdata;

    // Pass pagination info to TableHOC
    const paginationInfo = {
        currentPage: page,
        totalPages: cabdata?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (cabdata?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };

    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cab Booking History', true, paginationInfo)();

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
                        message="Failed to load cab booking history. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
        </div>
    );
};

export default CabHistory;
