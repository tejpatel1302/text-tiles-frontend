import { Order, columns } from "@/utils/column";
import { DataTable } from "@/components/common/Data-table";
import { OrderDetails } from "@/utils/Order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { getOrdersApi } from "@/features/api/apicall";
import { addId } from "@/features/redux_toolkit/orderItemIdSlice";
import { useCookies } from "react-cookie";
// import { selectCurrentToken } from "@/features/redux_toolkit/authSlice";

const OrderList = () => {
  // const dispatch = useDispatch()
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);
  // const{data: Order}= useAddOrderMutation()
  const [showOrder, setShowOrder]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getOrdersApi(payload);
      console.log(res, 'getOrders')
      setShowOrder(res?.data);
      // dispatch(addId(res?.data[0]?.id))
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);
 
  const data: Order[] = showOrder?.map((order:any) => ({
    customerId: order?.CustomerId,
    id: order?.id,
    Name: order?.OrderItem[0]?.logObject?.name,
    city: 'Ireland',
    email: '@xsdf',
    mobileNumber: '123456',
    orderDate: order?.orderDate,
  
    orderDetails: 'View',
    status: order.status,
  }));



  return (
    <div className="bg-white">
      <div className="text-3xl font-bold mt-10 ml-4 ">Orders </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-mt-12">
        <DataTable columns={columns} data={data} />
      </div>
      )}
    </div>
  );
};

export default OrderList;
