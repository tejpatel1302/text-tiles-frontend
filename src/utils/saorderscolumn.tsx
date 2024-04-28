"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


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
    
    orderDetails: string;
    status: string;
  };
  



  export const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Customer ID",
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
      accessorKey: "mobileNumber",
      header: "Mobile Number",
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      accessorKey: "orderDetails",
      header: "Order Details",
      
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({row})=>{
        return ( 
        <div className={cn('font-medium w-fit px-4 py-2 rounded-lg',{
            'text-red-500' : row.getValue('status') === 'Not Reviewed',
            'text-green-500' : row.getValue('status') === 'Reviewed'

        })}>
            {row.getValue('status')}
        </div>
        )
      }
    },
  ];
  
