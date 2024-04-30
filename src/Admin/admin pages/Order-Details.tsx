import { View, columns } from "@/utils/view-column";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useEffect, useState } from "react";
import { ReviewedApi, getOrderDetailsApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";

const AdminOrderDetails= () => {
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectAdminCurrentToken);
  const { orderItemId} = useSelector((state: any) => state.orderItemId);
  console.log(orderItemId,'idthrough')
  const [showOrderDetails, setShowOrderDetails]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getOrderDetailsApi(payload,orderItemId);
      console.log(res, 'getOrdersdetails')
      setShowOrderDetails(res?.order?.OrderItem);

      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);
 console.log(showOrderDetails[0]?.orderId,'yeah')
  const data: View[] = showOrderDetails?.map((order:any) => ({
    
      id: order?.id,
      image: '',
      name: order?.logObject?.name,
      color: '',
      size: order?.logObject?.size,
      price: order?.logObject?.price,
      quantity: order?.CartItem?.quantity,
      status: order?.status

      
    
    
  }));
  async function Reveiwed() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      const status = {
        status: "REVIEWED",
      };
      const res = await ReviewedApi(
        payload,
        showOrderDetails[0]?.orderId,
        status
      );
      console.log(res,"Response from Review")
     
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
function reviewClickHandler (){
  Reveiwed()
}

  return (
    <div className="bg-white">
      <div className="flex justify-between">
      <div className="text-3xl font-bold mt-10">Order Details</div>
      <div className="mt-10 mr-6  space-x-4 p-2">
      <Button variant={'green'} onClick={reviewClickHandler}>Review</Button>
      <Button variant={"red"}>Reject</Button>
      </div>
      </div>
    {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-mt-24">
        <DataTable columns={columns} data={data} />
      </div>
      )}
    </div>
  );
};

export default AdminOrderDetails;
