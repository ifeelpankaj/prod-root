/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import AdminSidebar from '../../../__components__/adminSidebar';
import { useFetchDisplayCabsQuery } from '../../../__redux__/api/cab.api';
import { Link } from 'react-router-dom';
import TableHOC from '../../../__components__/tableHOC';

import MessageDisplay from '../../../__components__/messageDisplay';
import Skeleton from 'react-loading-skeleton';

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
