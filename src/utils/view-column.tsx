    import { ColumnDef } from "@tanstack/react-table";
    import { Button } from "@/components/ui/button";
    // Import toast
    import { useSelector } from "react-redux";
    import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
    import { useCallback, useEffect, useState } from "react";
    import { actionApi } from "@/features/api/apicall";
    import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
    import { useCookies } from "react-cookie";
    import { Toaster, toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";


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
        status:any;
        productId:any
    };

    export const columns: ColumnDef<View>[] = [
        {
            accessorKey: "id",
            header: "Order Detail ID",
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
            accessorKey: "productId",
            header: "Product ID",
            cell: ({row}:any) => {
                const result = row.getValue('productId');
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
        {
            accessorKey: "Actions",
            header: 'Actions',
            cell: ({row}:any) => {
                // const token = useSelector(selectAdminCurrentToken);
                const [cookie] = useCookies(["auth"]);
                const queryClient = useQueryClient();
                const [loading, setLoading] = useState(false);
                const handleApprove = async (status:any) => {
                    try {
                   
                        const payload = {
                            Authorization: `Bearer ${cookie.auth}`,
                        };
                        const req  ={
                            orderItemId: status.id,
                            status: status?.status
                        };
                        const res = await actionApi(payload, req);
                        console.log(res, 'getApproval');    
                        // Update UI or state based on response if needed
                        toast.success('Item Approved');
                    } catch (error) {
                        console.error("Error approving item:", error);
                        toast.error('Failed to approve item');
                    } 
                };
                const handleReject = async (status:any) => {
                    try {
                   
                        const payload = {
                            Authorization: `Bearer ${cookie.auth}`,
                        };
                        const req  ={
                            orderItemId: status.id,
                            status: status?.status
                        };
                        const res = await actionApi(payload, req);
                        console.log(res, 'getApproval');    
                        // Update UI or state based on response if needed
                        const currentQuantity = row.getValue('quantity');
                            const currentPrice = row.getValue('price');
                            console.log(currentQuantity,'quantity')
                            console.log(currentPrice,'price')
                        toast.success('Item Rejected');
                    } catch (error) {
                        console.error("Error approving item:", error);
                        toast.error('Failed to approve item');
                    } 
                };
                const approveMutation = useMutation({
                    mutationFn: handleApprove,
                    onSuccess: async () => {
                      await queryClient.invalidateQueries({ queryKey:  ["orderDetailData"] });
                    },
                  });
                  const rejectMutation = useMutation({
                    mutationFn: handleReject,
                    onSuccess: async () => {
                      await queryClient.invalidateQueries({ queryKey:  ["orderDetailData"] });
                    },
                  });
                  const onApprove = useCallback(() => {
                    const status = {
                      status: "APPROVED",
                      id: row.getValue('id')
                    };
                    approveMutation.mutate(status, {
                      onSuccess: () => {
                        toast('success');
                      },
                      onError: () => {
                        toast('error');
                      },
                    });
                  }, []);
                  const onReject = useCallback(() => {
                    const status = {
                      status: "REJECTED",
                      id: row.getValue('id')
                    };
                    rejectMutation.mutate(status, {
                      onSuccess: () => {
                        toast('success');
                      },
                      onError: () => {
                        toast('error');
                      },
                    });
                  }, []);
                // const handleReject = () => {
                //     const currentQuantity = row.getValue('quantity');
                //     const currentPrice = row.getValue('price');
                //     const currentTotal = currentQuantity * currentPrice;
                    

                //     const updatedTotal = currentTotal - currentPrice;
                    
                //     toast.error(`Order Total    ${updatedTotal}`);
                // };
                

                return (
                    <div className="flex gap-3">
                        <div> 
            <Toaster position="top-center" />
        </div>
                        <Button variant={"green"} onClick={onApprove} disabled={loading}>Approve</Button>
                        <Button variant={'red'} onClick={onReject}>Reject</Button>
                    </div>
                );
            },
        }
    ];
