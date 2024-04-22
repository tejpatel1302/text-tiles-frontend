import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify'; // Import toast

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type View = {
    id: number;
    image: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
};


export const columns: ColumnDef<View>[] = [
    {
        accessorKey: "id",
        header: "Product ID",
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
        accessorKey: "Actions",
        header: 'Actions',
        cell: () => {
            const handleApprove = () => {
                // Show toast on approve button click
                toast.success('Item Approved');
                console.log('ho');
            };
        
            const handleReject = () => {
                // Show toast on reject button click
                toast.error('Item Rejected');
            };
        
            return (
                <div className="flex gap-3">
                    <Button variant={"green"} onClick={handleApprove}>Approve</Button>
                    <Button variant={'red'} onClick={handleReject}>Reject</Button>
                </div>
            );
        },
    }
];
