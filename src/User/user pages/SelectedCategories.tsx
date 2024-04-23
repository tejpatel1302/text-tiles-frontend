import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../features/redux_toolkit/cartSlice";
import { fetchProducts, STATUSES } from "../../features/redux_toolkit/productSlice"; // Import fetchProducts and STATUSES from the productSlice
import ProductCard from "./Card";
import { Button } from "@/components/ui/button";

const SelectedCategories = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(fetchProducts("")); // Dispatch fetchProducts thunk when component mounts
  }, [dispatch]); // Include dispatch in the dependency array to avoid linting warnings

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-5">
        {products?.map((product: any, index: any) => (
          <div>
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
            />
            <Button variant={"purple"} onClick={() => handleAdd(product)}>
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCategories;
