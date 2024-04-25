import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/features/redux_toolkit/wishlistSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ image, title, productId, isInWishlist, price, id }:any) => {
  const dispatch = useDispatch();

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist({ productId, image, title, price }));
    }
  };

  return (
    <div className="flex mt-10">
      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[550px] w-[300px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center">
      <Link to={`/user/products/${id}`}>  <img className="rounded-t h-96 p-4" src={`data:image/jpeg;base64,${image?.buffer}`} alt="men's wear" /></Link>
        <div
          className="absolute top-[350px] right-0 rounded-full p-1 mr-2 bg-gray-300 hover:bg-gray-700 cursor-pointer"
          onClick={toggleWishlist}
        >
          <Heart className="h-6 w-6 text-gray-600 inline-block" />
        </div>
        <div className="px-6">
          <div className="font-semibold text-xl mb-2">{title}</div>
          <div className="font-bold text-xl mb-2">{`${price} €`}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
