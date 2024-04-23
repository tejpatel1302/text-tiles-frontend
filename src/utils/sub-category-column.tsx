import { Button } from "@/components/ui/button";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategory = {
  subcategoryID: string,
  name: string,
  images: string,
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
          <div className="edit-cell-action flex gap-4">
            <Button onClick={setEditedRows} name="edit" variant={'green'}>
              Edit
            </Button>
            <Button onClick={removeRow} name="remove" variant={'red'}>
              Delete
            </Button>
          </div>
        )}
      </div>
    )
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


const columnHelper = createColumnHelper<SubCategory>();
export const columns = [
  columnHelper.accessor("subcategoryID", {
    header: "Subcategory ID",
   
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("images", {
    header: "SubCategory Image",
   
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell
  }),
 
  columnHelper.display({
    header:'Actions',
    id: "edit",
    cell: EditCell,
  }),
];
