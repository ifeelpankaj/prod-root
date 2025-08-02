import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableHOC from '../__components__/tableHOC';
import AdminSidebar from '../__components__/adminSidebar';
import StylishLoader from '../__components__/loader';
import { useFetchAllCabsQuery } from '../__redux__/api/admin.api';
import MessageDisplay from '../__components__/messageDisplay';
import { Monitor } from 'lucide-react';

const columns = [
    {
        Header: 'Photo',
        accessor: 'photo'
    },
    {
        Header: 'Cab Number',
        accessor: 'cabNumber'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Belongs To',
        accessor: 'belongsTo'
    },
    {
        Header: 'Upcoming Bookings',
        accessor: 'upcomingBookings'
    },
    {
        Header: 'Action',
        accessor: 'action'
    }
];

const TotalCabs = () => {
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data: adminCabs, isLoading: cabsLoading, isError } = useFetchAllCabsQuery({ page, limit });
    const [rows, setRows] = useState([]);

    React.useEffect(() => {
        if (adminCabs?.data && Array.isArray(adminCabs.data)) {
            setRows(
                adminCabs.data.map((cab) => ({
                    photo: (
                        <img
                            src={cab.photos && cab.photos.length > 0 ? cab.photos[0].url : 'https://via.placeholder.com/50x50?text=No+Image'}
                            alt={cab.modelName || 'Cab'}
                            style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '4px'
                            }}
                        />
                    ),
                    cabNumber: cab.cabNumber || 'N/A',
                    model: cab.modelName || 'N/A',
                    belongsTo: cab.belongsTo || 'N/A',
                    upcomingBookings: cab.upcomingBookings ? cab.upcomingBookings.length : 0,
                    action: <Link to={`/admin/cab/${cab._id}`}>Manage</Link>
                }))
            );
        }
    }, [adminCabs]);

    // Pass pagination info to TableHOC
    const paginationInfo = {
        currentPage: page,
        totalPages: adminCabs?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (adminCabs?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };

    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cabs', true, paginationInfo)();

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {cabsLoading ? (
                    <StylishLoader
                        size="large"
                        color="cyan"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Failed to load cabs data. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
            <Link
                to="/admin/cab/display"
                className="create-product-btn">
                <Monitor />
            </Link>
        </div>
    );
};

export default TotalCabs;
