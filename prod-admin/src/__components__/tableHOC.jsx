/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { usePagination, useSortBy, useTable } from 'react-table';

function TableHOC(columns, data, containerClassname, heading, showPagination = false, serverPagination = null) {
    return function HOC() {
        const isServerPagination = serverPagination !== null;
        const options = {
            columns,
            data,
            initialState: {
                pageSize: data.length // Show all data since server handles pagination
            },
            manualPagination: isServerPagination
        };

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            nextPage,
            pageCount,
            state: { pageIndex },
            previousPage,
            canNextPage,
            canPreviousPage
        } = useTable(options, useSortBy, usePagination);

        return (
            <div className={containerClassname}>
                <h2 className="heading">{heading}</h2>

                <table
                    className="table"
                    {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, headerGroupIdx) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={headerGroup.id || headerGroupIdx}>
                                {headerGroup.headers.map((column, colIdx) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        key={column.id || colIdx}>
                                        {column.render('Header')}
                                        {column.isSorted && (
                                            <span> {column.isSortedDesc ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);

                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={row.id}>
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {showPagination && (
                    <div className="table-pagination">
                        <button
                            disabled={isServerPagination ? !serverPagination.hasPrevPage : !canPreviousPage}
                            onClick={isServerPagination ? serverPagination.onPrevPage : previousPage}>
                            Prev
                        </button>
                        <span>
                            {isServerPagination
                                ? `${serverPagination.currentPage} of ${serverPagination.totalPages}`
                                : `${pageIndex + 1} of ${pageCount}`}
                        </span>
                        <button
                            disabled={isServerPagination ? !serverPagination.hasNextPage : !canNextPage}
                            onClick={isServerPagination ? serverPagination.onNextPage : nextPage}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    };
}

TableHOC.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    containerClassname: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    showPagination: PropTypes.bool
};
export default TableHOC;
