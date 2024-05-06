import { SA,columns } from "@/utils/saorder-details";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { Button } from "@/components/ui/button";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSAOrderDetailsApi, productionApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

const SAOrderDetails= () => {
  const [cookie] = useCookies(["auth"]);
  const params = useParams();
  const { id } = params;
  // const token = useSelector(selectSACurrentToken);
  // const { orderItemId} = useSelector((state: any) => state.orderItemId);
  // console.log(orderItemId,'idthrough')
  const [showOrderDetails, setShowOrderDetails]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getSAOrderDetailsApi(payload, id);
      console.log(res, 'getOrdersdetailsypoooo')
      setShowOrderDetails(res)

      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrderData();
    
  }, []);
  function createBlobFromBuffer(bufferString: string, mimetype: string): string | null {
    try {
      const binary = atob(bufferString);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: mimetype });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error creating Blob:", error);
      return null;
    }
  }
 console.log(showOrderDetails,'yeah')
  const data: View[] = showOrderDetails?.map((order:any) => ({
    
      id:order?.colorRelationId?.Product?.id,
      Image: order?.colorRelationId?.image ? createBlobFromBuffer(order?.colorRelationId?.image?.buffer, order?.colorRelationId?.image?.mimetype) : null,
      name: order?.logObject?.name,
      color:  order?.colorRelationId?.color?.name,
      size: order?.orderItemId?.CartItem?.itemSize,
      price: order?.colorRelationId?.Product?.price,
      // totalPrice: order?.totalPrice,
      quantity: order?.quantity,
    
      
    
    
  }));
  async function Reveiwed(status1:any) {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
        
      };
      const status = {
        status: status1,
      };
      const res = await productionApi(
        payload,
        showOrderDetails[0]?.erpOrderId?.id,
        status
      );
      console.log(res,"Response from Review")
   if(status1 === 'PRODUCTION'){
    toast('Order is in Production')
   }else{
    toast('Order is Completed')
   }
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
function reviewClickHandler (status1:any){
  Reveiwed(status1)
}





  return (
    <div className="bg-white">
      <Toaster/>
    <div className="flex justify-between">
    <div className="text-3xl font-bold mt-10">Order Details</div>
    <div className="mt-10 mr-6  space-x-4 p-2">
    <Button variant={'green'} onClick={() => {reviewClickHandler('PRODUCTION')}}>Production</Button>
    <Button variant={"green"} onClick={() => {reviewClickHandler('COMPLETED')}}>Complete</Button>
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
