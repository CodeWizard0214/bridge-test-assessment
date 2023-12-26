import React, { useState, useEffect } from "react";
import { useTable, Column } from "react-table";
import Pagination from "react-paginate";
import Spinner from "./Spinner";

interface Props {
  columns: any[];
  data: any[];
  currentPage: number;
  pageCount: number;
  handlePageClick: (Event: any) => void;
  loading: boolean;
}

const BridgeInTable: React.FC<Props> = ({
  columns,
  data,
  currentPage,
  pageCount,
  handlePageClick,
  loading,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="mt-2 flex flex-col">
      <div className="overflow-x-auto">
        <div className=" inline-block min-w-full ">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {loading ? (
              <div className=" min-h-96 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-10">
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-1 py-2 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {rows.map((row: any, i: number) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-1 py-2 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Pagination
        className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        forcePage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        pageClassName=""
        pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        breakClassName=" mx-4"
        activeLinkClassName=" bg-indigo-600 "
        previousLinkClassName="relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        nextLinkClassName="relative inline-flex items-center rounded-r-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      />
    </div>
  );
};

export default BridgeInTable;
