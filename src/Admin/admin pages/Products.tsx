import { Product,columns } from "@/utils/product-column";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";


const Products = () => {
  const token = useSelector(selectAdminCurrentToken);
  
  
  const [showProducts, setShowProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  async function fetchProductsData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
      };
      
      const res = await getProductsApi(payload);
      setShowProducts(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
console.log(showProducts)
  useEffect(() => {
    fetchProductsData();
  }, []);
  function createBlobFromBuffer(bufferString: string, mimetype: string): string | null {
    try {
      const binary = atob(bufferString);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: mimetype });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error creating Blob:", error);
      return null;
    }
  }
  const data: Product[] = showProducts?.map((product:any) => ({
    id: product?.id,
    name: product?.name,
    price : product?.price,
    colors : product?.colorRelation[0]?.color?.name,
    size : product?.size[0],
    images: product?.colorRelation[0]?.image ? createBlobFromBuffer(product?.colorRelation[0]?.image.buffer, product?.colorRelation[0]?.image.mimetype) : null,
    description: product?.description,
    material: product?.material,
    quantity: product?.quantity 
    
    
    
    
    
  }));
  return (
    <div >
       <div className="mt-10 ml-4 text-3xl font-bold">Products</div>
       {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-mt-12">
        <DataTable columns={columns} data={data} />
      </div>
      )}
    </div>
  );
};

export default Products;
