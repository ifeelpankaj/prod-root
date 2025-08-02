import React, { useState } from 'react';
import { useGetAllTransactionQuery } from '../../../../__redux__/api/transaction.api';
import { formatDate } from '../../../../__utils__/date.utils';
import { Link } from 'react-router-dom';
import TableHOC from '../../../../__components__/tableHOC';
import AdminSidebar from '../../../../__components__/adminSidebar';
import StylishLoader from '../../../../__components__/loader';
import MessageDisplay from '../../../../__components__/messageDisplay';
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
const PaidTransaction = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const isPending = false;
    const { data: transactions, isLoading, isError } = useGetAllTransactionQuery({ page, limit, isPending });
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

export default PaidTransaction;
