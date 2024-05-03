import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/redux_toolkit/cartSlice';
import { fetchProducts } from '../../features/redux_toolkit/productSlice';
import ProductCard from './Card';
import { getProductsApi, getProductsWithSubIDApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';
import { useCookies } from "react-cookie";
import { Search } from 'lucide-react';

const UserWebsite = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["auth"]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const[searchText, setSearchText] = useState('')
//   const { subId } = useSelector((state: any) => state.subId);
// console.log(subId ,'hihellocho')

let subcategoryId = localStorage.getItem("subcategoryId");
if (subcategoryId !== null && subcategoryId !== "") {
  subcategoryId = subcategoryId.replace(/"/g, "");
}

console.log(subcategoryId, 'please solve');

console.log(subcategoryId,'jiiijij')
  const [showProducts, setShowProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res;
        if (subcategoryId) {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsWithSubIDApi(payload, subcategoryId );
          setShowProducts(res);
          setFilteredProduct(res)
        } else {
          const payload = { Authorization: `Bearer ${cookie.auth}` };
          res = await getProductsApi(payload);
          setShowProducts(res?.data || res);
          setFilteredProduct(res?.data)
        }
        console.log(res, 'getprductsji');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, [subcategoryId, cookie.auth]);
  

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  return (
    <div className="mx-auto ml-24">
             <div className="container">
   <div className="search-box">
      <input type="text" className="search-input" placeholder="Search.." onChange={(e)=>{setSearchText(e.target.value)}}/>

      <button className="search-button">
        <i className="fas fa-search" onClick={()=>{
        const filteredProductData:any = showProducts.filter((res) =>
          res?.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
          setFilteredProduct(filteredProductData)
        }}><Search/></i>
      </button>
   </div>
</div>
      <div className='text-2xl font-semibold mt-10'>{title}</div>
      <div className='flex flex-wrap gap-10'>
        {filteredProduct?.map((product: any) => (
          <div key={product?.title}>
            <ProductCard image={subcategoryId  ? product?.colorRelation[0]?.image : product?.colorRelation[0]?.image} title={subcategoryId  ? product?.name : product.title} price={subcategoryId  ? product?.price :product.price} id={subcategoryId  ? product?.id :product.id} productid={subcategoryId  ? product?.id : product?.colorRelation[0]?.productId}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWebsite;
