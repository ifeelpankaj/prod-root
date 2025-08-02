import React, { useCallback, useState } from 'react';
import { useAdminGetAvailableCabsQuery, useAssignBookingMutation } from '../__redux__/api/admin.api';
import TableHOC from './tableHOC';
import StylishLoader from './loader';
import MessageDisplay from './messageDisplay';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
const AvaliableCabDisplay = ({ capacity, departureDate, dropOffDate }) => {
    const { id } = useParams(); // This is your orderId
    const [page, setPage] = useState(1);
    const limit = 6;
    const {
        data: freeCabs,
        isLoading,
        isError
    } = useAdminGetAvailableCabsQuery({
        capacity,
        departureDate,
        dropOffDate,
        page,
        limit
    });
    const [assignCab, { isLoading: isAssignLoading, isError: isAssigningError }] = useAssignBookingMutation();
    const [rows, setRows] = useState([]);
    const [assigningCabId, setAssigningCabId] = useState(null); // Track which cab is being assigned
    const [ogError, setOgError] = useState(null);
    const handleAssignCab = useCallback(
        async (cabId) => {
            try {
                setAssigningCabId(cabId);
                const result = await assignCab({
                    orderId: id,
                    newCabId: cabId
                }).unwrap();
                const { message } = result;
                toast.success(message);
            } catch (error) {
                setOgError(error.data.message);
                toast.error(`Operation Failed :     ${error.data.message}`);
                // Error handling is already managed by RTK Query's isAssigningError
            } finally {
                setAssigningCabId(null);
            }
        },
        [assignCab, id]
    );

    React.useEffect(() => {
        if (freeCabs?.data && Array.isArray(freeCabs.data)) {
            setRows(
                freeCabs.data.map((cab) => ({
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
                    belongsTo: cab.driver[0]?.name || 'N/A',
                    action: (
                        <button
                            onClick={() => handleAssignCab(cab._id)} // Assuming cab has _id field
                            disabled={isAssignLoading || assigningCabId === cab._id}>
                            {assigningCabId === cab._id ? 'Assigning...' : 'Assign'}
                        </button>
                    )
                }))
            );
        }
    }, [freeCabs, isAssignLoading, assigningCabId, handleAssignCab]);

    const paginationInfo = {
        currentPage: page,
        totalPages: freeCabs?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (freeCabs?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };

    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Cabs', true, paginationInfo)();

    return (
        <main>
            {/* Show assignment error if it occurs */}
            {isAssigningError && <div style={{ color: 'red', marginBottom: '10px' }}>{ogError}</div>}

            {isLoading ? (
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
    );
};
AvaliableCabDisplay.propTypes = {
    capacity: PropTypes.number.isRequired,
    departureDate: PropTypes.string.isRequired,
    dropOffDate: PropTypes.string.isRequired
};
export default AvaliableCabDisplay;
