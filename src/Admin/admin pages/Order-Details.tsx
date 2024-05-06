import { View, columns } from "@/utils/view-column";
import { DataTable } from "@/components/common/Data-table";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCallback, useEffect, useState } from "react";
import { ReviewedApi, getOrderDetailsApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

const AdminOrderDetails = () => {
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [reviewed, setReviewed] = useState(false);
  const [rejected, setRejected] = useState(false);

  async function getOrderDetails() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const res = await getOrderDetailsApi(payload, id);
      return res;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  const { isFetching, data: OrderDetailData } = useQuery({
    queryKey: ["orderDetailData"],
    queryFn: getOrderDetails,
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

  const status = OrderDetailData?.order?.OrderItem?.map((order) => ({
    status:
      order?.status === "REJECTED"
        ? `${order?.CartItem?.quantity * order?.logObject?.price} will be refunded`
        : "",
  }));
  const rejectedOrders = status?.filter((order) => order.status !== "");
  const totalRefundAmount = rejectedOrders?.reduce((acc, order) => acc + parseFloat(order.status.split(" ")[0]), 0);
  console.log(OrderDetailData,'KKKKKKKKKK')

  const data: View[] = OrderDetailData?.order?.OrderItem?.map((order: any) => ({
    id: order?.id,
    productId: order?.logObject?.id,
    image: order?.CartItem?.colorRelation?.image,
    Image: order?.CartItem?.colorRelation?.image ? createBlobFromBuffer(order?.CartItem?.colorRelation?.image?.buffer, order?.CartItem?.colorRelation?.image.mimetype) : null,
    name: order?.logObject?.name,
    color: order?.CartItem?.colorRelation?.color.name,
    size: order?.CartItem?.itemSize,
    price: order?.logObject?.price,
    quantity: order?.CartItem?.quantity,
    status: order?.status,
  }));

  async function Reviewed(status: any) {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const status1 = {
        status: status?.status,
      };
      const res = await ReviewedApi(payload, status.id, status1);
      console.log(res, "Response from Review");
      if (totalRefundAmount > 0) {
        toast.error(`Total of ${totalRefundAmount} will be refunded`);
      }
      setLoading(false);
      setReviewed(true);
      setRejected(true); // both reviewed and rejected buttons should be disabled after one of them is clicked
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }

  async function Rejected(status: any) {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const status1 = {
        status: status?.status,
      };
      const res = await ReviewedApi(payload, status.id, status1);
      console.log(res, "Response from Review");
      setLoading(false);
      setRejected(true);
      setReviewed(true); // both reviewed and rejected buttons should be disabled after one of them is clicked
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }

  const reviwedMutation = useMutation({
    mutationFn: Reviewed,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orderDetailData"] });
    },
  });

  const rejectedMutation = useMutation({
    mutationFn: Rejected,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orderDetailData"] });
    },
  });

  const onReview = useCallback(() => {
    const status = {
      status: "REVIEWED",
      id: id,
    };
    reviwedMutation.mutate(status, {
      onSuccess: () => {
        toast("REVIEWED");
      },
      onError: () => {
        toast("error");
      },
    });
  }, []);

  const onReject = useCallback(() => {
    const status = {
      status: "REJECTED",
      id: id,
    };
    rejectedMutation.mutate(status, {
      onSuccess: () => {
        toast("REJECTED");
      },
      onError: () => {
        toast("error");
      },
    });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <Toaster />
      <div className="flex justify-between">
        <div className="text-3xl font-bold mt-10">Order Details</div>
        <div className="mt-10 mr-6  space-x-4 p-2">
          <Button variant={"green"} onClick={onReview} disabled={reviewed || rejected}>
            Review
          </Button>
          <Button variant={"red"} onClick={onReject} disabled={reviewed || rejected}>
            Reject
          </Button>
        </div>
      </div>
      <div className="-mt-24">
        {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </div>
      <div className=" relative left-[650px] -top-[60px] text-2xl font-bold">
        Total Amount : {OrderDetailData?.order?.totalAmount}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
