import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/features/redux_toolkit/wishlistSlice';  // Import your Redux action
import { useCookies } from 'react-cookie';
import { deleteWishlistApi, getWisListApi } from '@/features/api/apicall';

const UserWishList = () => {
  const { wishListId } = useSelector((state: any) => state.wishListId);
  console.log(wishListId, 'hiii');
  const dispatch = useDispatch();
  const [cookie] = useCookies(["auth"]);
  const [showOrder, setShowOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      const res = await getWisListApi(payload);
      console.log(res, 'getsAmdinOrdershi');
      setShowOrder(res?.data || []); // Provide default empty array if res?.data is undefined
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchOrderData();
  }, []);
  
  console.log(showOrder.length > 0 ? showOrder[0]?.id : 'No ID available', 'jiiii');

  const handleRemoveFromWishlist = async (id: any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await deleteWishlistApi(payload, id);
      console.log(res, "hihello");
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-3xl font-bold m-4">Wish List</div>
      <div className="w-full flex flex-wrap justify-center">
        {showOrder && showOrder.length > 0 && showOrder.map((product: any) => (
          <div
            key={product?.id}
            className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[350px] w-[300px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center mx-4 my-4"
          >
            <div className="flex flex-col justify-center items-center">
              {product?.Product?.colorRelation && product?.Product?.colorRelation[0]?.image?.buffer && (
                <img src={`data:image/jpeg;base64,${product?.Product?.colorRelation[0]?.image?.buffer}`} alt={product?.name} className="w-full max-h-[200px] object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl text-center font-semibold mb-2">{product?.Product?.name}</h3>
                <p className="text-gray-800">${product?.Product?.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(product?.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishList;
