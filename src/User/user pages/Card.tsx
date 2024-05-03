import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/features/redux_toolkit/wishlistSlice';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { WishListApi } from '@/features/api/apicall';
import { addWishListId } from '@/features/redux_toolkit/wishlistDeleteSlice';
import './Card.css'


const ProductCard = ({ image, title, productid, isInWishlist, price, id }:any) => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["auth"]);
  const [loading, setLoading] = useState(false);
  // const toggleWishlist = () => {
  //   if (isInWishlist) {
  //     dispatch(removeFromWishlist(productid));
  //   } else {
  //     dispatch(addToWishlist({ productid, image, title, price }));
  //   }
  // };
  const clickHandler = async (id:any) => {
    try {
        setLoading(true);
        const payload = {
            Authorization: `Bearer ${cookie.auth}`,
        };
        const req  ={
            productId: id,
            
        };
        const res = await WishListApi(payload, req);
        console.log(res)
        console.log(res?.data?.id,'jiiiiiiiii')
      dispatch(addWishListId(res?.data?.id))
        // Update UI or state based on response if needed
       
    } catch (error) {
        console.error("Error approving item:", error);
        
    } finally {
        setLoading(false);
    }
};
  return (
    <div className="flex mt-10">
      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[550px] w-[300px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center">
      <Link to={`/user/products/${id}`}>  <img className="rounded-t h-96 p-4" src={`data:image/jpeg;base64,${image?.buffer}`} alt="men's wear" /></Link>
        <div
          className="absolute top-[370px] h-12 w-12 right-0 rounded-full p-1 mr-2 bg-gray-300 hover:bg-gray-700 cursor-pointer"
          // onClick={toggleWishlist} 
        >
        <div id="heart-container" className='relative -left-[40px] -top-[38px]' onClick={()=>{clickHandler(productid)}}>
  <input type="checkbox" id="toggle">
  </input>
    <div id="twitter-heart"></div>
</div>
        </div>
        <div className="px-6">
          <div className="font-semibold text-xl mb-2">{title}</div>
        </div>
          <div className="font-bold text-xl mb-2 float-left w-full ml-10">{`${price} €`}</div>
      </div>
    </div>
  );
};

export default ProductCard;
