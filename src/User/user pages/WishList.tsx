import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/features/redux_toolkit/wishlistSlice';  // Import your Redux action

const UserWishList = () => {
  const wishlist = useSelector((state:any) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId:any) => {
    dispatch(removeFromWishlist(productId)); // Dispatch the action to remove the product
  };

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-3xl font-bold">Wish List</div>
      <div className="w-full flex flex-wrap justify-center">
        {wishlist.map((product:any) => (
          <div
            key={product.productId}
            className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[550px] w-[300px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center mx-4 my-4"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col justify-center items-center">
              <img
                className="rounded-t h-96"
                src={product.image}
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-800">${product.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(product.productId)}
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
