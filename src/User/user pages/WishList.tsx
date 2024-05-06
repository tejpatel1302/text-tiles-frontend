import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/features/redux_toolkit/wishlistSlice';  // Import your Redux action
import { useCookies } from 'react-cookie';
import { deleteWishlistApi, getWisListApi } from '@/features/api/apicall';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const UserWishList = () => {
  const queryClient = useQueryClient();
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
      return res.data;
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  
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
  
  const { isFetching,  data: WistData } = useQuery({
    queryKey: ["wishListData"],
    queryFn: fetchOrderData,
  });

  const deleteMutation = useMutation({
    mutationFn: handleRemoveFromWishlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["wishListData"] });
    },
  });
  
  const onDelete = useCallback((id: any) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast('success');
      },
      onError: () => {
        toast('error');
      },
    });
  }, []);
  
  const wishlistProducts = new Set(); // Using Set to avoid duplicates
  
  return (
    <div className="w-[95%] mx-auto">
      <div className="text-3xl font-bold m-4">Wish List</div>
      <div className="w-full flex flex-wrap justify-center">
        {WistData && WistData.length > 0 && WistData.map((product: any) => {
          // Check if product id already exists in wishlist, if yes, skip rendering
          if (wishlistProducts.has(product?.Product?.id)) return null;
          
          wishlistProducts.add(product?.Product?.id); // Add product id to Set
          
          return (
            <div
              key={product?.id}
              className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[350px] w-[300px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center mx-4 my-4"
            >
              <div className="flex flex-col justify-center items-center">
                {product?.Product?.colorRelation && product?.Product?.colorRelation[0]?.image?.buffer && (
                 <Link to={`/user/products/${product?.Product?.id}`}> <img src={`data:image/jpeg;base64,${product?.Product?.colorRelation[0]?.image?.buffer}`} alt={product?.name} className="w-full max-h-[200px] object-cover" /></Link> 
                )}
                <div className="p-4">
                  <h3 className="text-xl text-center font-semibold mb-2">{product?.Product?.name}</h3>
                  <p className="text-gray-800">${product?.Product?.price}</p>
                  <button
                    onClick={() => onDelete(product?.id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserWishList;
