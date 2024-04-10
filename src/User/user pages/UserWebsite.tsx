import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux_toolkit/cartSlice';
import { fetchProducts, STATUSES } from '../../redux_toolkit/productSlice'; // Import fetchProducts and STATUSES from the productSlice
import ProductCard from './Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const UserWebsite = () => {
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
            <div className='text-2xl font-semibold'>See What We Have to Offer:</div>
            <div className='flex flex-wrap gap-10'>
                {products?.map((product:any) => (
                 <div key={product?.title}>
                       <Link to={`/user/products/${product.id}`}><ProductCard  image={product.image} title={product.title}/></Link>
           
                 </div>
                ))}
            </div>
        </div>
    );
};

export default UserWebsite;
