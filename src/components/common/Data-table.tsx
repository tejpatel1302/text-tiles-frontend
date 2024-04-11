import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "./DatePicker";
import { useLocation, useNavigate } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [d, setD] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    state: {
      sorting,
      columnFilters,
    },
    data: d, // Use 'd' state variable as data
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setD((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setD((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      removeRow: (rowIndex: number) => {
        const newData = [...d];
        newData.splice(rowIndex, 1); // Remove the row at the specified index

        // Update the state using the setD function
        setD(newData);

        // If you also want to update the original data, do it here as well
        setOriginalData(newData);
      },
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = location.pathname === "/user/order-history";
  const isWishList = location.pathname === "/user/wishlist";
  const isAdminProducts = location.pathname === "/admin/products";
  const isAdminOrders = location.pathname === "/admin/orders";
  const isOrderDetails = location.pathname === "/user/order-details";
  const isCategory = location.pathname === "/admin/manage-category";
  const isSubCategory = location.pathname === "/admin/manage-sub-category";
const isCart  = location.pathname === "/user/cart";
 
  function clickHandler() {
    if (isAdminOrders) {
      navigate("/admin/order-details");
    } else {
      navigate("/user/order-details");
    }
  }

  return (
    <>
      <div className={`${isWishList ? 'rounded-md ml-10' : 'rounded-md'}`}>
        <div className="text-3xl font-bold flex items-center gap-5 ">
          {!isUser && !isOrderDetails && !isWishList && (
            <div className="flex justify-between relative -top-[200px] left-[160px]  py-4">
              <Input
                placeholder="Search Order"
                value={
                  (table.getColumn("OrderID")?.getFilterValue() as string) ?? ""
                }
                onChange={(event: any) =>
                  table.getColumn("OrderID")?.setFilterValue(event.target.value)
                }
                className=" bg-[#f2f2f2] w-[500px] rounded-full "
              />
            </div>
          )}
          {(!isOrderDetails &&
            !isSubCategory &&
            !isCategory &&
            !isAdminProducts &&
          !isWishList) && (
            <div
              className={`${
                isUser ? "mb-10 mx-10" : "relative -top-[35px] right-[50px]"
              } `}
            >
              <DatePickerForm />
            </div>
          )}
        </div>
        <div className="">
          <Table className="">
            <TableHeader >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={`${isWishList ? 'flex space-x-[155px]' : ''}`}>  
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${isWishList ? 'flex space-x-[80px]' : ''}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}  className={`${isWishList ? 'w-[150px]' : ''}`}>
                        {(isAdminProducts || isCart )&& 
                        cell.column.columnDef.header === "images" ? (
                          <img
                            src={
                              (cell.row.original as { images: string })
                                .images
                            }
                            alt="Product image"
                            style={{ width: 70, height: 70 }}
                          />
                        ) : (isAdminOrders || isUser) &&
                          cell.column.columnDef.header === "Order Details" ? (
                          <Button variant={"purple"} onClick={clickHandler}>
                            {row.getValue("orderDetails")}
                          </Button>
                        ) : (
                          // For any other paths or headers, display cell content using flexRender
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
