import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type View = {
    id: number;
    Image: string;
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
        accessorKey: "Image",
        header: 'Image'
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
    
    // {
    //     accessorKey: "Actions",
    //     header: 'Actions',
    //     cell: ({row}:any) => {
    //         const token = useSelector(selectAdminCurrentToken);
    //         const [loading, setLoading] = useState(false);
    //         const handleApprove = async () => {
    //             try {
    //                 setLoading(true);
    //                 const payload = {
    //                     Authorization: `Bearer ${token}`,
    //                 };
    //                 const req  ={
    //                     orderItemId: row.getValue('id'),
    //                     status: "APPROVED"
    //                 };
    //                 const res = await actionApi(payload, req);
    //                 console.log(res, 'getApproval');
    //                 // Update UI or state based on response if needed
    //                 toast.success('Item Approved');
    //             } catch (error) {
    //                 console.error("Error approving item:", error);
    //                 toast.error('Failed to approve item');
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         const handleReject = () => {
    //             // Show toast on reject button click
    //             toast.error('Item Rejected');
    //         };

    //         return (
    //             <div className="flex gap-3">
    //                 <Button variant={"green"} onClick={handleApprove} disabled={loading}>Approve</Button>
    //                 <Button variant={'red'} onClick={handleReject}>Reject</Button>
    //             </div>
    //         );
    //     },
    // }
];
