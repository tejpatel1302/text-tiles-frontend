"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
    ordernumber: string;
    orderDate: string;
    Name: string;
    total: number;
    city: string;
    deliverydate: string;
    address: string;
    orderDetails: string;
    orderstatus: string;
    id:string
  };
  
  

  export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order Id",
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
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "total",
        header: "Total",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      // {
      //   accessorKey: "deliverydate",
      //   header: "Delivery Date",
      // },
      
      {
        accessorKey: "orderDetails",
        header: "Order Details",
      },
      {
        accessorKey: "orderstatus",
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
        cell: ({ row }) => {
          return (
            <div
              className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                "text-red-500": row.getValue("orderstatus") === "Shipped",
                "text-green-500": row.getValue("orderstatus") === "Delivered",
              })}
            >
              {row.getValue("orderstatus")}
            </div>
          );
        },
      },
      
  ];
  
