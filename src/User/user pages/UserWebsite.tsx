import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/redux_toolkit/cartSlice';
import { fetchProducts } from '../../features/redux_toolkit/productSlice';
import ProductCard from './Card';
import { getProductsApi, getProductsWithSubIDApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';

const UserWebsite = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserCurrentToken);
  const { subId } = useSelector((state: any) => state.subId);

  const [showProducts, setShowProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res;
        if (subId) {
          const payload = { Authorization: `Bearer ${token}` };
          res = await getProductsWithSubIDApi(payload, subId);
        } else {
          const payload = { Authorization: `Bearer ${token}` };
          res = await getProductsApi(payload);
        }
        setShowProducts(res?.data || []);

        console.log(res, 'getCategory');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [subId, token]);

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  return (
    <div className="container mx-auto ml-24">
      <div className='text-2xl font-semibold mt-10'>{title}</div>
      <div className='flex flex-wrap gap-10'>
        {showProducts?.map((product: any) => (
          <div key={product?.title}>
            <ProductCard image={product.image} title={product.title} price={product.price} id={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWebsite;
