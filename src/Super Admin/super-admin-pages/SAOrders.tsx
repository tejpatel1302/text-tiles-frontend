import { Order, columns } from "@/utils/saorderscolumn";
import { DataTable } from "@/components/common/Data-table";
import { OrderDetails } from "@/utils/Order-details";
import { useEffect, useState } from "react";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { useSelector } from "react-redux";
import { getSAOrdersApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";

const SAOrders = () => {
  // const token = useSelector(selectSACurrentToken);
  const [cookie] = useCookies(["auth"]);
  const [showOrder, setShowOrder]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getSAOrdersApi(payload);
      console.log(res, 'getsAmdinOrdershi')
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
  const data: Order[] = showOrder?.map((order) => ({
    id: order?.id,
    // OrderID: order?.id,
    Name: order?.addressId?.billToName,
    city: order?.addressId?.city,
    email: order?.orderId?.Customer?.email,
    mobileNumber: order?.orderId?.Customer?.phoneNum,
    orderDate: order.orderDate,
  
    orderDetails: 'View',
    status: order?.status,
  }));



  return (
    <div className="bg-white">
    <div className="text-3xl font-bold mt-10 ml-4 ">Orders History</div>
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

export default SAOrders;
