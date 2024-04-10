"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type View = {
    id: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    brand: string;
    
  };
  



  export const columns: ColumnDef<View>[] = [
    {
        accessorKey: "id",
        header: "Customer ID",
      },
      {
        accessorKey: "image",
        header: 'image'
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "color",
        header: "Color",
      },
      {
        accessorKey: "size",
        header: "Size",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
      {
        accessorKey: "Actions",
        header: 'Actions',
        cell: () => {
          return (
         <div className="flex gap-3">
            <Button variant={"green"}>Approve</Button>
         <Button variant={'red'}>Reject</Button>
         </div>
          );
        },
      }
      
  ];
  
