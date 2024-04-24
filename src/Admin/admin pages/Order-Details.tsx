import { View, columns } from "@/utils/view-column";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { Button } from "@/components/ui/button";

const AdminOrderDetails= () => {
  const data: View[] = ViewDetails.map((order:any) => ({
    
      id: order.id,
      image: order.image,
      name: order.name,
      color: order.color,
      size: order.size,
      price: order.price,
      quantity: order.quantity,
      
    
    
  }));



  return (
    <div className="bg-white">
      <div className="flex justify-between">
      <div className="text-3xl font-bold mt-10">Order Details</div>
      <div className="mt-10 mr-6  space-x-4 p-2">
      <Button variant={'green'}>Review</Button>
      <Button variant={"red"}>Reject</Button>
      </div>
      </div>
      <div className="-mt-24">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminOrderDetails;
