import { UserView, columns } from "@/utils/view-column copy";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getUserOrderDetailsApi } from "@/features/api/apicall";

const UserOrderDetails= () => {


  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectSACurrentToken);
  const { orderItemId } = useSelector((state: any) => state.orderItemId);
  console.log(orderItemId,'idthrough')
  const [showOrderDetails, setShowOrderDetails]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getUserOrderDetailsApi(payload,orderItemId);
      console.log(res, 'getOrdersdetailsypoooojii')
      setShowOrderDetails(res.OrderItem || [])

      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);




  const data: UserView[] = showOrderDetails?.map((order:any) => ({
    
      id: order?.order?.id,
      image: order?.image,
      name: order?.name,
      color: order?.color,
      size: order?.size,
      price: order?.price,
      quantity: order?.quantity,
      status: order?.status
      
    
    
  }));



  return (
    <div className="bg-white">
      <div className=" m-4 text-3xl font-bold">Order Details:</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
        <DataTable columns={columns} data={data} />
      </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
