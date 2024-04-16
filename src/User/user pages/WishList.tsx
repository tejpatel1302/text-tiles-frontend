import React from 'react';
import { useSelector } from 'react-redux';
import { WishListData } from "@/utils/wishlist-data";

const UserWishList = () => {
  
  const wishlist = useSelector((state:any) => state.wishlist.wishlist);

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-3xl font-bold">Wish List:</div>
       <div className='w-10/12 flex'>
       {wishlist.map((product: any) => (
      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[500px] w-[400px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center">
          <div key={product.productId} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col justify-center items-center">
            <img className="rounded-t h-96" src={product.image} alt={product.name} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-800">${product.price}</p>
             
            </div>
          </div>
      </div>
        ))}
       </div>
    </div>
  );
};

export default UserWishList;
