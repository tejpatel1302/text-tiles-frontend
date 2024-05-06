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
  function convertDateFormat(dateString: any) {
    if (!dateString) return "";
    const datePart = dateString.split("T")[0];
    return datePart;
  }
  const data: Order[] = showOrder?.map((order) => ({
    customerid: order?.CustomerId?.id,
    id: order?.id,
    OrderID: order?.orderId?.id,
    Name: order?.addressId?.billToName,
    city: order?.addressId?.city,
    email: order?.orderId?.Customer?.email,
    mobileNumber: order?.orderId?.Customer?.phoneNum,
    orderDate: convertDateFormat( order.orderDate),
    total: order?.totalAmount,
    orderDetails: 'View',
    status: order?.status,
  }));



  return (
    <div className="bg-white">
    <div className="text-3xl font-bold mt-10 ml-4 ">Orders</div>
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
