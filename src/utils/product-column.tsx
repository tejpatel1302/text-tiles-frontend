import DataTableRowActions from "./DataTableRowAction";
import DataTableRowActionsP from "./DataTableRowActionP";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  material: string;
  colors: any;
  images: any;
};

export const getProductColumns = ({ onEdit, onDelete }: any) => [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({row}:any) => {
      const result = row.getValue('id');
      const hyphenIndex = result.indexOf('-');
      const formattedResult = hyphenIndex !== -1 ? result.substring(0, hyphenIndex) : result;
      return (
          <div>
              {formattedResult}
          </div>
      );
  }
  },
  { accessorKey: "images", header: "images" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "colors", header: "Colors" },
  {
    accessorKey: "price",
    header: "Price",
    meta: {
      type: "number",
    },
  },
  { accessorKey: "size", header: "Size" },
  { accessorKey: "material", header: "Material" },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }: any) => (
      <DataTableRowActionsP row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
