

import { deleteProductApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  name: string;
  price: number;
  colors: any;
  size: any
  images: any;
  details: string;
  material: string;
  
  description: string;
  colorRelation: any
  id: string
  };
  const EditCell = ({ row, table, subCategoryId }: any) => {
  const meta = table.options.meta;
  const [categoryName, setCategoryName] = useState(row.original.name);
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);

  const setEditedRows = async (action: string) => {
      if (action === 'done') {
          try {
              const payload = {
                  Authorization: `Bearer ${cookie.auth}`,
                  // 'Content-Type': 'application/json'
              };
              const req = {
                  name: categoryName,
              };
              // Make API call to update subcategory name
              const res = await updateSubCategoryApi(payload, subCategoryId, req); // Corrected variable name here
              console.log(res, "hihello");

              // Reset edited state after successful update
              meta?.setEditedRows((old: []) => ({
                  ...old,
                  [row.id]: false,
              }));
          } catch (error) {
              console.error("Error updating subcategory name:", error);
              toast.success('Product is Updated');
          }
      } else {
          // For cancel action, just reset edited state
          meta?.setEditedRows((old: []) => ({
              ...old,
              [row.id]: false,
          }));
      }
  };

  const removeRow = async () => {
      meta?.removeRow(row.index);
   
      try {
          const payload = {
              Authorization: `Bearer ${cookie.auth}`,
              // 'Content-Type': 'application/json'
          };
  
          const res = await deleteSubCategoryApi(payload, subCategoryId); // Corrected variable name here
      
          console.log(res, "hihello");
        
      } catch (error) {
          console.error("Error fetching subcategory data:", error);
          toast.success('Product is Deleted');
      }
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(event.target.value);
  };

  return (
      <div className="edit-cell-container mr-32">
         <div>
            <Toaster position="top-center" />
            </div>
          {meta?.editedRows[row.id] ? (
              <div className="edit-cell-action flex gap-4">
                  <Button onClick={() => setEditedRows('cancel')} name="cancel" variant={'ghost'} className="text-red-500" >
                      <X/>
                  </Button>{" "}
                  <Button onClick={() => setEditedRows('done')} name="done" variant={'ghost'} className="text-green-500">
                      <Save/>
                  </Button>
              </div>
          ) : (
              <div className="edit-cell-action flex gap-4">
                  <Button onClick={() => meta?.setEditedRows((old: []) => ({ ...old, [row.id]: true }))} name="edit" variant={'green'}>
                      Edit
                  </Button>
                  <Button onClick={removeRow} name="remove" variant={'red'}>
                      Delete
                  </Button>
              </div>
          )}
          {/* Input field for editing category name */}
          <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-[0px]"
          />
      </div>
  );
};
    const TableCell = ({ getValue, row, column, table }:any) => {
      const initialValue = getValue()
      const columnMeta = column.columnDef.meta
      const tableMeta = table.options.meta
      const [value, setValue] = useState(initialValue)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
      const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value)
      }
      const onSelectChange = (e: any) => {
        setValue(e.target.value)
        tableMeta?.updateData(row.index, column.id, e.target.value)
      }
      if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === "select" ? (
          <select onChange={onSelectChange} value={initialValue}>
            {columnMeta?.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={onBlur}
            type={columnMeta?.type || "text"}
            className="border-2 border-black w-8/12 p-4"
          />
        )
      }
      return <span>{value}</span>
    }
  
  
  
  const columnHelper = createColumnHelper<Product>();
  export const columns = [
    columnHelper.accessor("id", {
      header: "Product ID",
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: TableCell
    }),
    columnHelper.accessor("price", {
      header: "Price",
      meta: {
        type: "number",
      },
      cell: TableCell
    }),
    columnHelper.accessor("colors", {
      header: "Colors",
      cell: TableCell
    }),
    columnHelper.accessor("size", {
      header: "Sizes",
      cell: TableCell
    }),
    columnHelper.accessor("images", {
      header: "images",
      cell: TableCell
    }),
   
    columnHelper.accessor("material", {
      header: "Material",
     
    }),
    columnHelper.display({
      header: 'Actions',
      id: "edit",
      cell: ({ row, table }) => <EditCell row={row} subCategoryId={row.original.id} table={table} />,
  }),
  ];
  
