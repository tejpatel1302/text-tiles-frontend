import { Product, getProductColumns } from "@/utils/product-column";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { deleteProductApi, getProductsApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";
import UpdateProductForm from "./UpdateProductForm";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import { Toaster, toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



const Products = () => {
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedProduct, setSelectedProduct]:any = useState(null)
  const queryClient = useQueryClient();
  
  
  async function getProducts() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      const res = await getProductsApi(payload);
      return res.data;
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
     
    }
  }
  const handleDeleteProduct = async (id:any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      // Make API call to delete the product
      const res = await deleteProductApi(payload, id);
      
      console.log(res, "Product deleted successfully");
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again later.");
    }
  };
  const { isFetching,  data: ProductData } = useQuery({
    queryKey: ["productData"],
    queryFn: getProducts,
  });
  console.log(ProductData,'finalData')
 
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
  
  const data: Product[] = ProductData?.map((product:any) => ({
    id: product?.colorRelation[0]?.productId ,
    name: product?.name,
    price : parseFloat(product?.price),
    colors : product?.colorRelation[0]?.color?.name,
    size : product?.size[0],
    images: product?.colorRelation[0]?.image ? createBlobFromBuffer(product?.colorRelation[0]?.image.buffer, product?.colorRelation[0]?.image.mimetype) : null,
    description: product?.description,
    material: product?.material,
   
    
    
    
    
    
  }));
  const deleteMutation = useMutation({
    mutationFn:  handleDeleteProduct ,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["productData"] });
    },
  });
  const onDelete = useCallback((product: any) => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        // toast('success');
      },
      onError: () => {
        // toast('error');
      },
    });
  }, []);
  const onEdit = useCallback((product: any) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
    
  }, []);

  const columns = useMemo(() => getProductColumns({ onEdit, onDelete }), [
    onDelete,
    onEdit,
  ]);
  return (
    <TableCard className="h-full">
            <Toaster/>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Manage Products</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <UpdateProductForm
              isOpen={isDialogOpen}
              product={selectedProduct}
              onOpenChange={(value:any) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedProduct(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
      <div className="-mt-24">
      {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </div>
      </CardContent>
    </TableCard>
  );
};

export default Products;
