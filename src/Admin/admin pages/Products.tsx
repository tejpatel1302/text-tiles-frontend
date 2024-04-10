import { Product,columns } from "@/utils/product-column";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";


const Products = () => {
  const data: Product[] = products.map((product) => ({
      Id: product.Id,
    
      Name: product.Name,
      price : product.price,
      colors : product.colors,
      sizes : product.sizes,
      images: product.images,
      details: product.details,
      brand: product.brand,
      quantity: product.quantity 

    
   
   

  }));



  return (
    <div >
       <div className=" my-10 text-3xl font-bold">Products:</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Products;
