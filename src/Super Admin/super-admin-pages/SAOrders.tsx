import { Order, columns } from "@/utils/column";
import { DataTable } from "@/components/common/Data-table";
import { OrderDetails } from "@/utils/Order-details";
import { useEffect, useState } from "react";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { useSelector } from "react-redux";
import { getSAOrdersApi } from "@/features/api/apicall";

const SAOrders = () => {
  const token = useSelector(selectSACurrentToken);
  const [showOrder, setShowOrder]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
       
      };
      
      const res = await getSAOrdersApi(payload);
      console.log(res, 'getsAmdinOrders')
      setShowOrder(res?.data);
      
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);
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
