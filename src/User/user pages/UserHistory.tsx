import { Order, columns } from "@/utils/user-column";
import { DataTable } from "@/components/common/Data-table";
import { OrderHistory } from "@/utils/OrderHistory";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderHistoryApi } from "@/features/api/apicall";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useCookies } from "react-cookie";

const UserHistory = () => {
  // const token = useSelector(selectUserCurrentToken);
  const [cookie] = useCookies(["auth"]);
  // const{data: category}= useAddCategoryMutation()
  const [showHistory, setShowHistory]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getOrderHistoryApi(payload);
      console.log(res?.data, 'getOrderHistory')
      setShowHistory(res?.data);
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategoryData();
    
  }, []);
 
  const data: Order[] = showHistory?.map((order: any) => ({
    orderid: order?.id,
    orderDate: order?.orderDate,
    Name: order?.Address?.billToName,
    total: order?.totalAmount,
    city: order?.Address?.city,


    
    orderDetails: 'View',
    orderstatus: order.status,
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

export default UserHistory;
