

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
              'text-red-500' : row.getValue('status') === 'REJECTED',
              'text-green-500' : row.getValue('status') === 'APPROVED'
  
          })}>
              {row.getValue('status')}
          </div>
          )
        }
      },
    
      
  ];
  
