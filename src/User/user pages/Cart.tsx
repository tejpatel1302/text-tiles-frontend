import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../features/redux_toolkit/cartSlice";
import { DataTable } from "@/components/common/Data-table";
import { UserCart, columns, getCartColumns } from "@/utils/user-cart-column";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteCartIndividualApi, getCartApi } from "@/features/api/apicall";

import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import UpdateCartForm from "./UpdateCartForm";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedcart, setSelectedCart]:any = useState(null)
  const queryClient = useQueryClient();
  const isCheckout = location.pathname === "/user/checkout";

  const [showProducts, setShowProducts] = useState<UserCart[]>([]);
  const [loading, setLoading] = useState(true);
  // const token = useSelector(selectUserCurrentToken);


  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };
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
  async function fetchCartProductsData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await getCartApi(payload);
      return res?.data?.cart?.CartItem 
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
  const { isFetching,  data: CartData } = useQuery({
    queryKey: ["cartData"],
    queryFn: fetchCartProductsData,
  });


  const data: UserCart[] = CartData ? CartData.map((item: any) => ({
    id: item?.id,
    quantity: item?.quantity,
    itemSize: item?.itemSize,
    totalPrice: item?.totalPrice,
    images: item?.colorRelation?.image?.buffer ? createBlobFromBuffer(item?.colorRelation?.image?.buffer, item?.colorRelation?.image?.mimetype) : null,
    name: item?.colorRelation?.Product?.name
  }))
  :[];

  function clickHandler() {
    navigate("/user/checkout");
  }
  const handleCartDelete = async (id:any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      // Make API call to delete the product
      const res = await deleteCartIndividualApi(payload, id);
      
      console.log(res, "Product deleted successfully");
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again later.");
    }
  };
  const deleteMutation = useMutation({
    mutationFn: handleCartDelete ,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["cartData"] });
    },
  });

  const onDelete = useCallback((cart: any) => {
    deleteMutation.mutate(cart.id, {
      onSuccess: () => {
        toast('success');
      },
      onError: () => {
        toast('error');
      },
    });
  }, []);

const onEdit = useCallback((cart: any) => {
  setSelectedCart(cart)
  setIsDialogOpen(true)
  
}, []);

const columns = useMemo(() => getCartColumns({ onEdit, onDelete }), [
  onDelete,
  onEdit,
]);
  return (
    <TableCard className="h-full">
    <Toaster/>
<CardHeader>
<CardTitle>Cart</CardTitle>
<div className={`${isCheckout ? "flex items-center gap-8" : "my-4 mr-24"}`}>
          {/* {!isCheckout ? (
            <div></div>
          ) : (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button>Total: 1000</Button>
            </div>
          )} */}
          <Button variant={"green"} onClick={clickHandler}>
            {`${isCheckout ? "Edit" : "Proceed To Buy"}`}
          </Button>
        </div>
<div className="flex justify-between">
  <div />
  <div className="flex-nowrap">
    <UpdateCartForm
      isOpen={isDialogOpen}
      cart={selectedcart}
      onOpenChange={(value:any) => {
        setIsDialogOpen(value);
        if (!value) {
          setSelectedCart(null);
        }
      }}
    />
  </div>
</div>
</CardHeader>
<CardContent>
{isFetching && <span>Loading</span>}
{!isFetching && <DataTable data={data} columns={columns} />}
</CardContent>
</TableCard>
  );
};

export default Cart;
