import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/redux_toolkit/cartSlice';
import { fetchProducts, STATUSES } from '../../features/redux_toolkit/productSlice'; // Import fetchProducts and STATUSES from the productSlice
import ProductCard from './Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const UserWebsite = ({title}:any) => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state:any) => state.product);
console.log(products.id)
    useEffect(() => {
        dispatch(fetchProducts('')); // Dispatch fetchProducts thunk when component mounts
    }, [dispatch]); // Include dispatch in the dependency array to avoid linting warnings

    const handleAdd = (product:any) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className="container mx-auto ml-24">
            <div className='text-2xl font-semibold'>{title}</div>
            <div className='flex flex-wrap gap-10'>
                {products?.map((product:any) => (
                 <div key={product?.title}>
                       <ProductCard  image={product.image} title={product.title} price={product.price} id={product.id}/>
           
                 </div>
                ))}
            </div>
        </div>
    );
};

export default UserWebsite;
