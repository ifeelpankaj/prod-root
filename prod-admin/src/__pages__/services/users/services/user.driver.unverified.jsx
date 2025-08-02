import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllAdminDriverQuery } from '../../../../__redux__/api/admin.api';
import TableHOC from '../../../../__components__/tableHOC';
import AdminSidebar from '../../../../__components__/adminSidebar';
import StylishLoader from '../../../../__components__/loader';
import MessageDisplay from '../../../../__components__/messageDisplay';

const columns = [
    // {
    //     Header: 'Photo',
    //     accessor: 'photo'
    // },
    {
        Header: 'Name',
        accessor: 'username'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Role',
        accessor: 'role'
    },
    {
        Header: 'Cell Number',
        accessor: 'phoneNumber'
    },
    {
        Header: 'Action',
        accessor: 'action'
    }
];
const TotalUnverifiedDrivers = () => {
    const [page, setPage] = useState(1);

    const limit = 6;
    const verified = false;
    const { data: adminUser, isLoading: usersLoading, isError } = useGetAllAdminDriverQuery({ page, limit, verified });
    const [rows, setRows] = useState([]);
    React.useEffect(() => {
        if (adminUser?.data && Array.isArray(adminUser.data)) {
            setRows(
                adminUser.data.map((user) => ({
                    //     photo: (
                    //     <img
                    //         src={cab.photos && cab.photos.length > 0 ? cab.photos[0].url : 'https://via.placeholder.com/50x50?text=No+Image'}
                    //         alt={cab.modelName || 'Cab'}
                    //         style={{
                    //             width: '50px',
                    //             height: '50px',
                    //             objectFit: 'cover',
                    //             borderRadius: '4px'
                    //         }}
                    //     />
                    // ),
                    username: user.username || 'N/A',
                    email: user.email || 'N/A',
                    role: user.role || 'N/A',
                    phoneNumber: user.phoneNumber,
                    action: <Link to={`/admin/customer/${user._id}`}>Manage</Link>
                }))
            );
        }
    }, [adminUser]);
    const paginationInfo = {
        currentPage: page,
        totalPages: adminUser?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (adminUser?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Un Verified Drivers', true, paginationInfo)();
    return (
        <div className="admin-container">
            <AdminSidebar />

            <main>
                {usersLoading ? (
                    <StylishLoader
                        size="large"
                        color="cyan"
                    />
                ) : isError ? (
                    <MessageDisplay
                        type="error"
                        message="Failed to load Customer data. Please try again later."
                    />
                ) : (
                    Table
                )}
            </main>
        </div>
    );
};

export default TotalUnverifiedDrivers;
