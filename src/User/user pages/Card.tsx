import React from 'react';
import { Share, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';

const ProductCard = ({image, title}:any) => {
    
  return (
    <div className="flex mt-10 ">
      <div className=" rounded-lg border border-gray-300 overflow-hidden shadow-lg relative h-[500px] w-[400px] transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center">
        <img className="rounded-t h-96" src={image} alt="men's wear"/>
        <div className="absolute top-[350px] right-0   rounded-full p-1 mr-2 bg-gray-300     hover:bg-gray-700">
          <Heart className="h-6 w-6 text-gray-600 inline-block " />
        </div>
        <div className="px-6 ">
          <div className="font-bold text-xl mb-2">Men's Wear Lorem ipsum dolor sit.</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="inline-block bg-brown-500 rounded-full  py-1 text-xl font-semibold text-black relative right-[140px]">50 €</span>
        
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
