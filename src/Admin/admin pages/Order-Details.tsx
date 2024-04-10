import { View, columns } from "@/utils/view-column";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";

const AdminOrderDetails= () => {
  const data: View[] = ViewDetails.map((order:any) => ({
    
      id: order.id,
      image: order.image,
      name: order.name,
      color: order.color,
      size: order.size,
      price: order.price,
      quantity: order.quantity,
      brand: order.brand
    
    
  }));



  return (
    <div className="bg-white">
      <div className=" m-10 my-10 text-3xl font-bold">Order Details</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminOrderDetails;
