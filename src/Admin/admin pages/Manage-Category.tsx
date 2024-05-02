
import { DataTable } from "@/components/common/Data-table";
import { deleteCategoryApi, getCategoryApi } from "@/features/api/apicall";
import { useAddCategoryMutation } from "@/features/api/productsApiSLice";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { category } from "@/utils/category";
import { Category, columns, getCategoryColumns } from "@/utils/category-column";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import { Toaster, toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdateCategoryForm from "./UpdateCategoryForm";

const ManageCategory = () => {
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedCategory, setSelectedCategory]:any = useState(null)
  const queryClient = useQueryClient();
  
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getCategoryApi(payload);
     return res?.data
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    
    }
  }
  const { isFetching,  data: CategoryData } = useQuery({
    queryKey: ["categoryData"],
    queryFn: fetchCategoryData,
  });
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
  const data: Category[] = CategoryData?.map((item: any) => ({
  
    categoryID: item?.id,
    categoryName: item?.name, 
    images: item.image ? createBlobFromBuffer(item.image.buffer, item.image.mimetype) : null,
  
}));
const handleDeleteCategory = async (id:any) => {
      try {
        const payload = {
          Authorization: `Bearer ${cookie.auth}`,
        };
  
        const res = await deleteCategoryApi(payload, id);
        console.log(res, "Delete successful");
  
        toast.success("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category. Please try again later.");
      }
    };
const deleteMutation = useMutation({
  mutationFn:handleDeleteCategory ,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey:  ["categoryData"] });
  },
});

const onDelete = useCallback((category: any) => {
  deleteMutation.mutate(category.categoryID, {
    onSuccess: () => {
      toast('success');
    },
    onError: () => {
      toast('error');
    },
  });
}, []);

const onEdit = useCallback((category: any) => {
console.log(category,'edit ma aave che')
setSelectedCategory(category)
setIsDialogOpen(true)

}, []);

const columns = useMemo(() => getCategoryColumns({ onEdit, onDelete }), [
onDelete,
onEdit,
]); // Added missing dependencies
console.log(selectedCategory,'data che')
  return (
    <TableCard className="h-full">
            <Toaster/>
      <CardHeader>
        <CardTitle>Manage Category</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <UpdateCategoryForm
              isOpen={isDialogOpen}
              category={selectedCategory}
              onOpenChange={(value:any) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedCategory(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </CardContent>
    </TableCard>
  );
};

export default ManageCategory;
