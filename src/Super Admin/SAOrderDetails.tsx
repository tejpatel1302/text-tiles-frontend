import { SA,columns } from "@/utils/saorder-details";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { Button } from "@/components/ui/button";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSAOrderDetailsApi, productionApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";

const SAOrderDetails= () => {
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectSACurrentToken);
  const { orderItemId} = useSelector((state: any) => state.orderItemId);
  console.log(orderItemId,'idthrough')
  const [showOrderDetails, setShowOrderDetails]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getSAOrderDetailsApi(payload,orderItemId);
      console.log(res, 'getOrdersdetails')
      setShowOrderDetails(res?.orderItems)

      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);
 console.log(showOrderDetails,'yeah')
  const data: View[] = showOrderDetails?.map((order:any) => ({
    
      id:order?.productId?.id,
      image: order?.colorRelationId?.image,
      name: order?.logObject?.name,
      color:  order?.colorRelationId?.color?.name,
      size: order?.logObject?.size,
      price: order?.totalPrice,
      quantity: order?.quantity,
    
      
    
    
  }));
  async function Reveiwed() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      const status = {
        status: "REVIEWED",
      };
      const res = await productionApi(
        payload,
        showOrderDetails[0]?.erpOrderId?.id,
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
    <Button variant={'green'} onClick={reviewClickHandler}>Production</Button>
    <Button variant={"green"}>Complete</Button>
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

export default SAOrderDetails;
