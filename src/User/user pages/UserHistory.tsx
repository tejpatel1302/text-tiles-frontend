import { Order, columns } from "@/utils/user-column";
import { DataTable } from "@/components/common/Data-table";
import { OrderHistory} from "@/utils/OrderHistory";

const UserHistory = () => {
  const data: Order[] = OrderHistory.map((order:any) => ({
    ordernumber: order.ordernumber,
    orderDate: order.orderDate,
    Name: order.name,
    total: order. total,
    city: order.city,
    deliverydate: order.deliverydate,
    
    address: order.address,
    orderDetails: order.orderdetails,
    orderstatus: order.status,
  }));



  return (
    <div className="bg-white">
      <div className=" m-10 my-10 text-3xl font-bold">Orders History:</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserHistory;
