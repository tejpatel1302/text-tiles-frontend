

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserView = {
    id: number;
    images: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    status: string;
    
  };
  



  export const columns: ColumnDef<UserView>[] = [
    {
        accessorKey: "id",
        header: "Product ID",
      },
      {
        accessorKey: "images",
        header: 'images'
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
        accessorKey: "total",
        header: "Total",
        cell: ({row}:any) => {
          const result = row.getValue('quantity') * row.getValue('price');
          const formattedResult = result.toFixed(2); // Limit to 2 decimal places
          return (
              <div>
                  {formattedResult}
              </div>
          );
      }
      
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({row})=>{
          return ( 
          <div className={cn('font-medium w-fit  rounded-lg',{
              'text-red-500' : row.getValue('status') === 'Not Reviewed',
              'text-green-500' : row.getValue('status') === 'Reviewed'
  
          })}>
              {row.getValue('status')}
          </div>
          )
        }
      },
    
      
  ];
  
