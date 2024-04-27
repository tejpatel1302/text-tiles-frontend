import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/redux_toolkit/cartSlice';
import { fetchProducts } from '../../features/redux_toolkit/productSlice';
import ProductCard from './Card';
import { getProductsApi, getProductsWithSubIDApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';
import { useCookies } from "react-cookie";

const UserWebsite = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["auth"]);
  const { subId } = useSelector((state: any) => state.subId);
console.log(subId ,'hihellocho')
  const [showProducts, setShowProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res;
        if (subId) {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsWithSubIDApi(payload, subId);
          setShowProducts(res);
        } else {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsApi(payload);
          setShowProducts(res?.data || res);
        }
        console.log(res, 'getprductsji');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, [subId, cookie.auth]);
  

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  return (
    <div className="container mx-auto ml-24">
      <div className='text-2xl font-semibold mt-10'>{title}</div>
      <div className='flex flex-wrap gap-10'>
        {showProducts?.map((product: any) => (
          <div key={product?.title}>
            <ProductCard image={subId ? product?.image : product?.colorRelation[0]?.image} title={subId ? product?.name : product.title} price={subId ? product?.price :product.price} id={subId ? product?.id :product.id} productid={subId ? product?.id : product?.colorRelation[0]?.productId}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWebsite;
