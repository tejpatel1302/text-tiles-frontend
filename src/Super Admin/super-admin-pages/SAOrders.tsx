import { Order, columns } from "@/utils/column";
import { DataTable } from "@/components/common/Data-table";
import { OrderDetails } from "@/utils/Order-details";

const SAOrders = () => {
  const data: Order[] = OrderDetails.map((order) => ({
    customerId: order.customerId,
    OrderID: order.orderId,
    Name: order.name,
    city: order.city,
    email: order.email,
    mobileNumber: order.mobileNumber,
    orderDate: order.orderDate,
    address: order.address,
    orderDetails: order.orderDetails,
    status: order.status,
  }));



  return (
    <div >
       <div className="mt-10 ml-4  text-3xl font-bold">Orders</div>
       <div className="-mt-12">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default SAOrders;
