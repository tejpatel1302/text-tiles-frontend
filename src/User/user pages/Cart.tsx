import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../features/redux_toolkit/cartSlice";
import { DataTable } from "@/components/common/Data-table";
import { UserCart, columns } from "@/utils/user-cart-column";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartApi } from "@/features/api/apicall";
import { RootState } from "@/app/store"; // Assuming RootState contains the type of your Redux state
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useCookies } from "react-cookie";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies([`auth`]);
  const isCheckout = location.pathname === "/user/checkout";

  const [showProducts, setShowProducts] = useState<UserCart[]>([]);
  const [loading, setLoading] = useState(true);
  // const token = useSelector(selectUserCurrentToken);
  const cartData = useSelector((state: RootState) => state.cart.cartData);

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
      setShowProducts(res?.data?.cart?.CartItem || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
console.log(showProducts,'jijiji')
  useEffect(() => {
    fetchCartProductsData();
  }, [ cookie.auth]);

  const data: UserCart[] = showProducts?.map((item: any) => ({
    id: item?.id,
    quantity: item?.quantity,
    itemSize: item?.itemSize,
    totalPrice: item?.totalPrice,
    images: item?.colorRelation?.image?.buffer ? createBlobFromBuffer(item?.colorRelation?.image?.buffer, item?.colorRelation?.image?.mimetype) : null,
    name: item?.colorRelation?.Product?.name
  }));

  function clickHandler() {
    navigate("/user/checkout");
  }

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-between">
        <div className=" text-3xl font-bold ml-4 mt-4">{`${isCheckout ? "Items" : "Cart"}`}</div>
        <div className={`${isCheckout ? "flex items-center gap-8" : "my-4 mr-24"}`}>
          {!isCheckout ? (
            <div></div>
          ) : (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button>Total: 1000</Button>
            </div>
          )}
          <Button variant={"green"} onClick={clickHandler}>
            {`${isCheckout ? "Edit" : "Proceed To Buy"}`}
          </Button>
        </div>
      </div>
     
       {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-mt-20">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default Cart;
