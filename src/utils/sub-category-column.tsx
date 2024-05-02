import { Button } from "@/components/ui/button";
import { deleteSubCategoryApi, updateSubCategoryApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DataTableRowActions from "./DataTableRowAction";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategory = {
  subcategoryID: string,
  name: string,
  images: string,
};




export const getSubCategoryColumns = ({ onEdit, onDelete }: any) => [
  {
    accessorKey: "subcategoryID",
    header: "Subcategory ID",
    meta: {
      type: "number",
    },
  },
  {
    accessorKey: "images",
    header: "images",
  },
  {
    accessorKey: "name",
    header: "Name",

  },
  {
    header: 'Actions',
    id: "edit",
    cell: ({ row }: any) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

