import React, { useEffect } from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import { useFetchDisplayCabsQuery } from '../../../__redux__/api/cab.api';
import { Link } from 'react-router-dom';
import TableHOC from '../../../__components__/tableHOC';
import StylishLoader from '../../../__components__/loader';
import MessageDisplay from '../../../__components__/messageDisplay';

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
        Header: 'Action',
        accessor: 'action'
    }
];

const DisplayCab = () => {
    const { data: displayCab, isLoading: cabsLoading, isError } = useFetchDisplayCabsQuery();
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        if (displayCab?.data && Array.isArray(displayCab.data)) {
            setRows(
                displayCab.data.map((cab) => ({
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
                    belongsTo: cab.belongsTo.username || 'N/A',
                    action: <Link to={`/admin/cab/${cab._id}`}>Manage</Link>
                }))
            );
        }
    }, [displayCab]);

    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cabs', false, 7)();

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
        </div>
    );
};

export default DisplayCab;
