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
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "./DatePicker";
import { useLocation, useNavigate } from "react-router-dom";
import { Divide, EyeIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addId } from "@/features/redux_toolkit/orderItemIdSlice";
import ImageColorDialog from "@/Admin/admin pages/ImageColorDialog";

interface DataTableProps<TData extends OrderDetails, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface OrderDetails {
  id: any;
  Image: any; 
}
export function DataTable<TData extends OrderDetails, TValue>({
  columns,
  data,
}: DataTableProps<OrderDetails, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'orderDate', desc: true }, // Set default descending sorting for "Order Date" column
  ]);

  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState(""); // Added state for global filter
  const [startDate, setStartDateState] = useState<Date | null>(null);
  const [endDate, setEndDateState] = useState<Date | null>(null);
  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return data;
    const start = startDate.getTime(); // Get start date in milliseconds
    const end = endDate.getTime(); // Get end date in milliseconds
    // Filter the data based on date range (disregarding time)
    return data.filter((item) => {
      const itemDate = new Date(item.orderDate).setHours(0, 0, 0, 0); // Set time to midnight
      return itemDate >= start && itemDate <= end;
    });
  }, [data, startDate, endDate]);
  

  const [d, setD] = useState(() => [...filteredData]);

  const table = useReactTable({
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    data: d,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
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
        newData.splice(rowIndex, 1);
        setD(newData);
        setOriginalData(newData);
      },
    },
  });
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = location.pathname === "/user/order-history";
  const isWishList = location.pathname === "/user/wishlist";
  const isAdminProducts = location.pathname === "/admin/products";
  const isAdminOrders = location.pathname === "/admin/orders";
  const isOrderDetails = location.pathname === "/user/order-details";
  const isAdminDetails = location.pathname === "/admin/order-details";
  const isCategory = location.pathname === "/admin/manage-category";
  const isSubCategory = location.pathname === "/admin/manage-sub-category";
  const isSuperAdminOrders = location.pathname === "/super-admin/orders";
  const isSuperAdminDetails =
  location.pathname === "/super-admin/order-details";
const isCart  = location.pathname === "/user/cart";
const isCheckout  = location.pathname === "/user/checkout";
const isSuperAdminReport = location.pathname === "/super-admin/order-report";
const isAdminReport = location.pathname === "/admin/order-report";
const isUserReport = location.pathname === "/user/order-report";
const isUserPM = location.pathname === "/user/payment-methods";
const isUserA = location.pathname === "/user/address-book";

const isAdminDashboard = location.pathname.startsWith("/admin/order-details");
const isSuperAdminDashboard = location.pathname.startsWith("/super-admin/order-details");
const isUserDashboard = location.pathname.startsWith("/user/order-details");


  const [placeholder, setPlaceholder] = useState(isUser ? "Search Order History" : isWishList ? "Search Wishlist"  : isSuperAdminDashboard ? "Search Order Details" : isAdminProducts ? "Search Products" : isAdminOrders ? "Search Orders" : isSuperAdminOrders ? "Search Orders": isUserDashboard ? "Search Order Details" : isCategory ? "Search Categories" : isSubCategory ? "Search Sub-Categories" : isCart ? "Search Order" : isAdminDashboard ? 'Search Admin Order Details' : '' );


  function clickHandler() {
    if (isAdminOrders) {
      navigate("/admin/order-details");
    } else if (isSuperAdminOrders) {
      navigate("/super-admin/order-details");
    } else {
      navigate("/user/order-details");
    }
  }

  function handleDatePickerApply(): void {
    console.log(`Date range applied from ${startDate} to ${endDate}`);
    // Apply the date filter upon date picker apply
    const filteredByDate = data.filter(item => {
      const itemDate = new Date(item.orderDate).setHours(0, 0, 0, 0); // Set time to midnight
      return itemDate >= startDate && itemDate <= endDate;
    });
    setD(filteredByDate);
  }

  function setStartDate(date: Date | null): void {
    setStartDateState(date);
  }

  function setEndDate(date: Date | null): void {
    setEndDateState(date);
  }
  function clickHandler2(id:any){
    dispatch(addId(id))
  }
  const totalPrice = useMemo(() => {
    return d.reduce((total, row) => {
      console.log(total,"hoemucj")
      return total + (row.totalPrice)}, 0);
  }, [d]);
  const totalPrice3 = useMemo(() => {
    return d.reduce((total, row) => total + (row.price*row.quantity), 0);
  }, [d]);
  const totalPrice2 = useMemo(() => {
    return d.reduce((total, row) => total + (row.price*row.quantity), 0);
  }, [d]);
 
  return (
    <>
      <div className={`${isWishList || isCart ? 'rounded-md ' : 'rounded-md'}`}>
        <div className="text-3xl font-bold flex items-center gap-5 ">
          {!isUserDashboard && !isWishList && !isCheckout && !isSuperAdminReport && !isUserReport &&  !isAdminReport && !isUserPM && !isUserA && (
            <div className={`flex justify-between relative ${  isSubCategory || isCategory || isAdminProducts  ? '-top-[94px]': isCart  ? '-top-[112px] left-[450px]' : isUser || isAdminOrders || isSuperAdminOrders ? '-top-[125px]': '-top-[100px]'} left-[160px]  py-4`}>
              <Input
                placeholder={placeholder}
                value={globalFilter} // Changed to use globalFilter state
                onChange={(event: any) => setGlobalFilter(event.target.value)} // Changed to update globalFilter state
                className=" bg-[#f2f2f2] w-[500px] rounded-full  border border-black py-8 pl-5 focus:outline-none  focus:ring-purple-600 focus:ring-opacity-10"
              />
            </div>
          )}
          {(!isUserDashboard &&
            !isSubCategory &&
            !isCategory &&
            !isAdminProducts &&
            !isWishList &&
          !isCart &&
          !isCheckout && !isAdminDashboard && !isUserDashboard  && !isSuperAdminDashboard && 
          !isSuperAdminDetails && !isUserPM && !isUserA) && (
              <div
                className={`${isUser || isSuperAdminReport  ? "mb-10" : "relative -top-[15px] right-[50px]"
                  } `}
              >
               <DatePickerForm
  setStartDate={(date: Date | null) => setStartDate(date)}
  setEndDate={(date: Date | null) => setEndDate(date)}
  onApply={handleDatePickerApply}
/>
              </div>
            )}
        </div>
       
        <div className="">
          <Table className="">
            <TableHeader >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
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
                  onClick={()=>{clickHandler2(row.original.id)}}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                
                  >
                    {row.getVisibleCells().map((cell) => (
  <TableCell key={cell.id}>
  {isAdminProducts && cell.column.columnDef.header === "Image" ? (
     <>
     <ImageColorDialog colorRelation={cell.row.original.Image}/>
   </>
  ) : (
    cell.column.columnDef.header === "Image" ? (
      <img src={(cell.row.original as { Image: string }).Image} alt="Product image" style={{ width: 70, height: 70 }} />
    ) : (
      flexRender(cell.column.columnDef.cell, cell.getContext())
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
      { isCart && <div className="absolute left-[1100px] text-2xl font-bold">
       Total Price: {totalPrice} 
       </div>}
       {/* { isAdminDashboard && <div className="absolute left-[950px] text-2xl font-bold">
       Total Price: {totalPrice2} 
       </div>} */}
       {/* {
        isUserDashboard  && <div className="absolute left-[1170px] text-2xl font-bold">
        Total Price: {totalPrice3} 
        </div>
       } */}
      </div>
     {!isCheckout && !isUserReport && !isAdminReport && !isSuperAdminReport ? <div className="flex items-center justify-end space-x-2 py-4">
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
      </div> :  <div></div>}
    </>
  );
}
