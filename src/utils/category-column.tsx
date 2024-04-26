import { Button } from "@/components/ui/button";
import { deleteCategoryApi, updateCategoryApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Cross, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IconRight } from "react-day-picker";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  categoryID: number;
  categoryName: string;
  
  images: string;
};
const EditCell = ({ row, table, categoryId }: any) => {
    const meta = table.options.meta;
    const [categoryName, setCategoryName] = useState(row.original.categoryName);
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
                // Make API call to update category name
                const res = await updateCategoryApi(payload, categoryId, req);
                console.log(res, "hihello");

                // Reset edited state after successful update
                meta?.setEditedRows((old: []) => ({
                    ...old,
                    [row.id]: false,
                }));
            } catch (error) {
                console.error("Error updating category name:", error);
                toast.success('Category Has Been Updated');
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
    
            const res = await deleteCategoryApi(payload, categoryId);
            
            console.log(res, "hihello");
          
        } catch (error) {
            console.error("Error fetching subcategory data:", error);
            toast.success('Category Has Been Deleted');
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
                className="relative right-[200px] -top-[20px] p-4"
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

const columnHelper = createColumnHelper<Category>();
export const columns = [
    columnHelper.accessor("categoryID", {
        header: "Category ID",
        meta: {
            type: "number",
        },
    }),
    columnHelper.accessor("images", {
        header: "images",
    }),
    columnHelper.accessor("categoryName", {
        header: "Category Name",
        cell: TableCell
    }),
    columnHelper.display({
        header: 'Actions',
        id: "edit",
        cell: ({ row, table }) => <EditCell row={row} categoryId={row.original.categoryID} table={table}  />
    }),
];
