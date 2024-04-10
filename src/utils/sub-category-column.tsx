import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategory = {
    subcategoryID: number;
    subcategoryName: string;
    subcategoryDescription: string;
    mainCategoryName: string;
};

export const columns: ColumnDef<SubCategory>[] = [
    {
        accessorKey: "subcategoryID",
        header: "Subcategory ID",
    },
    {
        accessorKey: "subcategoryName",
        header: "Subcategory Name",
    },
    {
        accessorKey: "subcategoryDescription",
        header: "Subcategory Description",
    },
    {
        accessorKey: "mainCategoryName",
        header: "Main Category Name",
    },
    {
        accessorKey: "Actions",
        header: 'Actions',
       
      }
];
