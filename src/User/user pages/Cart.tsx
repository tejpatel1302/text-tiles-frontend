import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../redux_toolkit/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state:any) => state.cart);
    const handleRemove = (productId:any) => {
        dispatch(remove(productId));
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Cart</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product:any) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-2 rounded-md" />
                        <h5 className="text-lg font-semibold mb-1">{product.title}</h5>
                        <p className="text-gray-700 mb-2">${product.price}</p>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
                            onClick={() => handleRemove(product.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
