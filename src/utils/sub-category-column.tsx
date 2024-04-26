import { Button } from "@/components/ui/button";
import { deleteSubCategoryApi, updateSubCategoryApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategory = {
  subcategoryID: string,
  name: string,
  images: string,
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
              toast.success('SubCategory Has Been Updated');
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
          toast.success('SubCategory Has Been Deleted');
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
              className="relative right-[130px] -top-[20px] p-1 w-16"
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
        <div></div>
      )
    }
    return <span>{value}</span>
  }


const columnHelper = createColumnHelper<SubCategory>();
export const columns = [
  columnHelper.accessor("subcategoryID", {
    header: "Subcategory ID",
   
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("images", {
    header: "images",
   
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell
  }),
 
  columnHelper.display({
    header: 'Actions',
    id: "edit",
    cell: ({ row, table }) => <EditCell row={row} subCategoryId={row.original.subcategoryID} table={table} />,
}),
];
