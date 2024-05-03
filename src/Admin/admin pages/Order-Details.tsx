import { View, columns } from "@/utils/view-column";
import { DataTable } from "@/components/common/Data-table";

import { ViewDetails } from "@/utils/View-details";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCallback, useEffect, useState } from "react";
import { ReviewedApi, getOrderDetailsApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

const AdminOrderDetails= () => {
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const params = useParams();
  const { id } = params;
  // const token = useSelector(selectAdminCurrentToken);
  // const { orderItemId} = useSelector((state: any) => state.orderItemId);
  // console.log(orderItemId,'idthrough')

  const [loading, setLoading] = useState(true);
  async function getOrderDetails() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await  getOrderDetailsApi(payload, id);
      return res?.order?.OrderItem;

      
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    
    }
  }

  const { isFetching,  data: OrderDetailData} = useQuery({
    queryKey: ["orderDetailData"],
    queryFn: getOrderDetails
  });
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
  const data: View[] =  OrderDetailData?.map((order:any) => ({
    
      id: order?.id,
      image: order?.CartItem?.colorRelation?.image,
      images:order?.CartItem?.colorRelation?.image ? createBlobFromBuffer(order?.CartItem?.colorRelation?.image?.buffer, order?.CartItem?.colorRelation?.image.mimetype) : null,
      name: order?.logObject?.name,
      color: order?.CartItem?.colorRelation?.color.name,
      size: order?.logObject?.size,
      price: order?.logObject?.price,
      quantity: order?.CartItem?.quantity,
      status: order?.status

      
    
    
  }));
  console.log(OrderDetailData,'hiihi')
  
  async function Reveiwed(status:any) {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      const status1 = {
        status: status?.status,
      };
      const res = await ReviewedApi(
        payload,
      status.id,
        status1
      );
      console.log(res,"Response from Review")
     
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  async function Rejected(status:any) {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      const status1 = {
        status: status?.status,
      };
      const res = await ReviewedApi(
        payload,
      status.id,
        status1
      );
      console.log(res,"Response from Review")
     
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  const reviwedMutation = useMutation({
    mutationFn: Reveiwed,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["orderDetailData"] });
    },
  });
  const rejectedMutation = useMutation({
    mutationFn: Rejected,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["orderDetailData"] });
    },
  });
  const onReview = useCallback(() => {
    const status = {
      status: "REVIEWED",
      id: id
    };
    reviwedMutation.mutate(status, {
      onSuccess: () => {
        toast('REVIEWED');
      },
      onError: () => {
        toast('error');
      },
    });
  }, []);
  const onReject = useCallback(() => {
    const status = {
      status: "REJECTED",
      id: id
    };
    reviwedMutation.mutate(status, {
      onSuccess: () => {
        toast('REJECTED');
      },
      onError: () => {
        toast('error');
      },
    });
  }, []);
// function reviewClickHandler (){
//   Reveiwed()
// }

  return (
    <div className="bg-white">
      <Toaster/>
      <div className="flex justify-between">
      <div className="text-3xl font-bold mt-10">Order Details</div>
      <div className="mt-10 mr-6  space-x-4 p-2">
      <Button variant={'green'} onClick={onReview}>Review</Button>
      <Button variant={"red"} onClick={onReject}>Reject</Button>
      </div>
      </div>
      <div className="-mt-24">
      {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
