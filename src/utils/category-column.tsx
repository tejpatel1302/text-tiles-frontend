import { Button } from "@/components/ui/button";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  categoryID: number;
  categoryName: string;
  categoryDescription: string;
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
        <div className="edit-cell-container">
        {meta?.editedRows[row.id] ? (
          <div className="edit-cell-action">
            <button onClick={setEditedRows} name="cancel">
              ⚊
            </button>{" "}
            <button onClick={setEditedRows} name="done">
              ✔
            </button>
          </div>
        ) : (
          <div className="edit-cell-action">
            <button onClick={setEditedRows} name="edit">
              ✐
            </button>
            <button onClick={removeRow} name="remove">
              X
            </button>
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
        />
      )
    }
    return <span>{value}</span>
  }

const columnHelper = createColumnHelper<Category>();
export const columns = [
  columnHelper.accessor("categoryID", {
    header: "Category ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("categoryName", {
    header: "Category Name",
  }),
  columnHelper.accessor("categoryDescription", {
    header: "Category Description",
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
