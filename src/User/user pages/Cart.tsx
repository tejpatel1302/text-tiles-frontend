import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../features/redux_toolkit/cartSlice";
import { DataTable } from "@/components/common/Data-table";

import { UserCart, columns } from "@/utils/user-cart-column";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCheckout = location.pathname === "/user/checkout";

  const { cartData } = useSelector((state: any) => state.cart);
  console.log(cartData);
  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };
  const data: UserCart[] = cartData.map((data: any) => ({
    productId: data?.id,

    name: data?.title,
    price: data?.price,

    category: data?.category,
    images: data?.image,
  }));
  function clickHandler() {
    navigate("/user/checkout");
  }

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-between">
        <div className=" text-3xl font-bold">{`${
          isCheckout ? "Items" : "Cart"
        }`}</div>
        <div className={`${isCheckout ? "flex items-center gap-8" : "my-4 mr-24 "}`}>
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
      <div className="flex flex-col justify-center w-[95%] mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Cart;
