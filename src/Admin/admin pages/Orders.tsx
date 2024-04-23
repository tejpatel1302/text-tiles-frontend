import { Order, columns } from "@/utils/column";
import { DataTable } from "@/components/common/Data-table";
import { OrderDetails } from "@/utils/Order-details";
import { useSelector } from "react-redux";
// import { selectCurrentToken } from "@/features/redux_toolkit/authSlice";

const OrderList = () => {
  // const token = useSelector(selectCurrentToken)
  // console.log(token,'token')
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
       <div className=" m-10 my-10 text-3xl font-bold">Orders</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default OrderList;
