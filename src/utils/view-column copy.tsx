

import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserView = {
    id: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    brand: string;
    
  };
  



  export const columns: ColumnDef<UserView>[] = [
    {
        accessorKey: "id",
        header: "Customer ID",
      },
      {
        accessorKey: "image",
        header: 'image'
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "color",
        header: "Color",
      },
      {
        accessorKey: "size",
        header: "Size",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
    
      
  ];
  
