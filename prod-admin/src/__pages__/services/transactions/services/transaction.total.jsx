/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useGetAllTransactionQuery } from '../../../../__redux__/api/transaction.api';
import { formatDate } from '../../../../__utils__/date.utils';
import { Link } from 'react-router-dom';
import TableHOC from '../../../../__components__/tableHOC';
import AdminSidebar from '../../../../__components__/adminSidebar';
import MessageDisplay from '../../../../__components__/messageDisplay';
import Skeleton from 'react-loading-skeleton';

const columns = [
    {
        Header: 'Transaction Type',
        accessor: 'type'
    },
    {
        Header: 'Amount',
        accessor: 'amount'
    },
    {
        Header: 'Transaction Date',
        accessor: 'transactionDate'
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Is Pending',
        accessor: 'isPending'
    },
    {
        Header: 'Payout',
        accessor: 'payoutId'
    },
    {
        Header: 'Action',
        accessor: 'action'
    }
];
const TotalTransaction = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const { data: transactions, isLoading, isError } = useGetAllTransactionQuery({ page, limit });
    const [rows, setRows] = useState([]);
    React.useEffect(() => {
        if (transactions?.data && Array.isArray(transactions.data)) {
            setRows(
                transactions.data.map((transaction) => ({
                    type: transaction.type || 'N/A',
                    amount: transaction.amount || 'N/A',
                    transactionDate: formatDate(transaction.transactionDate) || 'N/A',
                    description: transaction.description || 'N/A',
                    isPending: transaction.isPending === true ? 'Yes' : 'No',
                    payoutId: transaction.payoutId || 'N/A',
                    action: <Link to={`/admin/transaction/${transaction._id}`}>Manage</Link>
                }))
            );
        }
    }, [transactions]);
    const paginationInfo = {
        currentPage: page,
        totalPages: transactions?.pagination?.totalPages || 1,
        onNextPage: () => setPage((prev) => prev + 1),
        onPrevPage: () => setPage((prev) => prev - 1),
        hasNextPage: page < (transactions?.pagination?.totalPages || 1),
        hasPrevPage: page > 1
    };
    const Table = TableHOC(columns, rows, 'dashboard-product-box', 'Transactions', true, paginationInfo)();

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                {isLoading ? (
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

export default TotalTransaction;
