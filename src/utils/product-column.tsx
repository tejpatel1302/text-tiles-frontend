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
    meta: {
      type: "number",
    },
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
