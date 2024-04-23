

import { ColumnDef } from "@tanstack/react-table";
import {  ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderReportc = {
  ordertotal:string
  totalmoney:string
  };
  



  export const columns: ColumnDef<OrderReportc>[] = [
    {
      accessorKey: "ordertotal",
      header: "Total Orders",
    },
    {
      accessorKey: "totalmoney",
      header: "Total Money",
    },
  ];
  
