import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../redux_toolkit/cartSlice';
import { DataTable } from '@/components/common/Data-table';
import { WishList, columns } from '@/utils/wishlist-column';

const Cart = () => {
    const dispatch = useDispatch();
    const {cartData} = useSelector((state:any) => state.cart);
    console.log(cartData)
    const handleRemove = (productId:any) => {
        dispatch(remove(productId));
    };
    const data: WishList[] = cartData.map((data:any) => ({
        productId: data?.productId,
      
        name: data?.title,
        price : data?.price,
        category : data?.category,
        images: data?.image,
        
    }));
    return (
        <div className="w-[95%] mx-auto">
        <div className=" text-3xl font-bold">Wish List:</div>
       <div className="flex flex-col justify-center w-[95%] mx-auto my-10">
         <DataTable columns={columns} data={data} />
       </div>
     </div>
    );
};

export default Cart;
