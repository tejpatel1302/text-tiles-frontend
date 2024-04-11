import { Button } from "@/components/ui/button";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Cross, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IconRight } from "react-day-picker";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WishList = {
  category: string; 
  name: string;
  price: string;
  image: string
  productId:string
};
const EditCell = ({ row, table }: any) => {
    const meta = table.options.meta;
    const setEditedRows = (e: any) => {
      meta?.setEditedRows((old: []) => ({
        ...old,
        [row.id]: !old[row.id],
      }));
    };
    const removeRow = () => {
        meta?.removeRow(row.index);
      };
    //   meta?.editedRows[row.id] ? 
    return (
        <div className="edit-cell-container mr-32">
        
        {meta?.editedRows[row.id] ? (
          <div className="edit-cell-action flex gap-4">
            <Button onClick={setEditedRows} name="cancel" variant={'ghost'} className="text-red-500" >
              <X/>
            </Button>{" "}
            <Button onClick={setEditedRows} name="done" variant={'ghost'} className="text-green-500">
              <Save/>
            </Button>
          </div>
        ) : (
          <div className="edit-cell-action flex">
           
            <Button onClick={removeRow} name="remove" variant={'red'}>
              Remove
            </Button>
          </div>
        )}
      </div>
    )
  };

  

const columnHelper = createColumnHelper<WishList>();
export const columns = [
    columnHelper.accessor("productId", {
        header: "Product ID",
        
    }),
    columnHelper.accessor("image", {
        header: "Image",
        
    }),
    columnHelper.accessor("name", {
        header: "Name",
        
    }),
    columnHelper.accessor("price", {
        header: "Price",
        
    }),
    columnHelper.accessor("category", {
      header: "Category",
     
      meta: {
        type: "number",
      },
    }),
    
  
  columnHelper.display({
    header:'Actions',
    id: "edit",
    cell: EditCell,
  }),
];
