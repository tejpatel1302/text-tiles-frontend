

import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  Name: string;
  price: number;
  colors: any;
  sizes: any
  images: any;
  details: string;
  material: string;
  quantity: number;
  };
  
  

  export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "Name",
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

