import { UserView, columns } from "@/utils/view-column copy";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getUserOrderDetailsApi } from "@/features/api/apicall";
import { useParams } from "react-router-dom";

const UserOrderDetails= () => {

  const params = useParams();
  const { id } = params;
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectSACurrentToken);
  // const { orderItemId } = useSelector((state: any) => state.orderItemId);
  // console.log(orderItemId,'idthrough')
  const [showOrderDetails, setShowOrderDetails]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getUserOrderDetailsApi(payload, id);
      console.log(res, 'getOrdersdetailsypoooojii')
      setShowOrderDetails(res?.order?.OrderItem || [])

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
console.log(showOrderDetails, 'Finaldetaisl')

  const data: UserView[] = showOrderDetails?.map((order:any) => ({
    
      id: order?.id,

      name: order?.CartItem?.colorRelation?.Product?.name,
      images: order?.CartItem?.colorRelation?.image ? createBlobFromBuffer(order?.CartItem?.colorRelation?.image.buffer, order?.CartItem?.colorRelation?.image.mimetype) : null,
      color: order?.color,
      size: order?.logObject?.size,
      price: order?.logObject?.price,
      quantity: order?.CartItem?.quantity,
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
