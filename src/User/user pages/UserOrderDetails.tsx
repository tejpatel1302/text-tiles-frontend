import { UserView, columns } from "@/utils/view-column copy";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";

const UserOrderDetails= () => {
  const data: UserView[] = ViewDetails.map((order:any) => ({
    
      id: order.id,
      image: order.image,
      name: order.name,
      color: order.color,
      size: order.size,
      price: order.price,
      quantity: order.quantity,
      status: order.status
      
    
    
  }));



  return (
    <div className="bg-white">
      <div className=" m-10 my-10 text-3xl font-bold">Order Details:</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserOrderDetails;
