import { ColumnDef } from "@tanstack/react-table";
import {  ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import OrderTableRowView from "@/Admin/admin pages/OrderTableRowView";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
    customerId: number;
    id: number;
    Name: string;
    city: string;
    email: string;
    mobileNumber: string;
    orderDate: string;
    OrderID:string;
    orderDetails: string;
    status: string;
    total:any
    customerid:any
  };
  



  export const columns: ColumnDef<Order>[] = [
    {
      accessorKey:'OrderID',
      header: 'Order ID',
      cell: ({row}:any) => {
        const result = row.getValue('OrderID');
        const hyphenIndex = result.indexOf('-');
        const formattedResult = hyphenIndex !== -1 ? result.substring(0, hyphenIndex) : result;
        return (
            <div>
                {formattedResult}
            </div>
        );
    }

    },
    {
      accessorKey: "customerid",
      header: "Customer ID",
      cell: ({row}:any) => {
        const result = row.getValue('customerid');
        const hyphenIndex = result.indexOf('-');
        const formattedResult = hyphenIndex !== -1 ? result.substring(0, hyphenIndex) : result;
        return (
            <div>
                {formattedResult}
            </div>
        );
    }
    },
    {
      accessorKey: "id",
      header: "ERP Order ID",
      cell: ({row}:any) => {
        const result = row.getValue('id');
        const hyphenIndex = result.indexOf('-');
        const formattedResult = hyphenIndex !== -1 ? result.substring(0, hyphenIndex) : result;
        return (
            <div>
                {formattedResult}
            </div>
        );
    }
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => {
        const isSorted = column.isSorted;
        const isSortedDesc = column.isSortedDesc;
        
        return (
          <Button
            variant="ghost"
            onClick={() => {
              // If the column is not sorted or is currently sorted in descending order, toggle to ascending order
              // Otherwise, toggle to descending order
              const nextSortDesc = !isSorted || isSortedDesc ? false : true;
              column.toggleSorting(nextSortDesc);
            }}
          >
            Order Date
            {isSorted ? (
              isSortedDesc ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUp className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({row}:any) => {
        function convertDateFormat(dateString: any) {
          if (!dateString) return "";
          const datePart = dateString.split("T")[0];
          return datePart;
        }
        const result = row.getValue('orderDate');
        const formattedResult = convertDateFormat(result)
        return (
            <div className="ml-4">
                {formattedResult}
            </div>
        );
    }
    },
    // {
    //   accessorKey: "id",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         OrderID
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    // },
    {
      accessorKey: "Name",
      header: "Name",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
  

    {
      accessorKey: "orderDetails",
      header: "Order Details",
      cell: ({ row }: any) => (
        <OrderTableRowView row={row}/>
      ),
    },
    {
      accessorKey: "status",
      header: 'Status',
      cell: ({ row }:any) => {
        const capitalizedStatus:any = row.getValue("status").toUpperCase();
        return (
          <div
            className={cn("font-medium w-fit  py-2 rounded-lg", {
              "text-red-500": capitalizedStatus === "REJECTED",
              "text-[#5295f1]": capitalizedStatus === "REVIEWED",
              "text-[#6531df]": capitalizedStatus === "PENDING",
              "text-green-500": capitalizedStatus === "COMPLETED",
              "text-orange-500": capitalizedStatus === "PRODUCTION"
            })}
          >
            {capitalizedStatus}
          </div>
        );
      },
    },
  ];
  
