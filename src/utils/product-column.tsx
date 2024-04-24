

import { ColumnDef } from "@tanstack/react-table";


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
  quantity: number;
  description: string;
  colorRelation: any
  id: string
  };
  
  

  export const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "Product ID",
    },
    {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "colors",
        header: "Colors",
      },
      {
        accessorKey: "sizes",
        header: "Sizes",
      },
      {
        accessorKey: "images",
        header: "images",
      },
      {
        accessorKey: "details",
        header: "Details",
      },
      {
        accessorKey: "material",
        header: "Material",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
  ];

