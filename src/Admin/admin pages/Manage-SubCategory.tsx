import { DataTable } from "@/components/common/Data-table";
import { SubCategory, columns, getSubCategoryColumns } from "@/utils/sub-category-column";
import { deleteSubCategoryApi, getSubCategoryApi } from "@/features/api/apicall";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import { Toaster } from "sonner";
import UpdateSubCategoryForm from "./UpdateSubCategoryForm";

interface ManageSubCategoryProps {
  // Add props if needed
}

const ManageSubCategory: React.FC<ManageSubCategoryProps> = () => {
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedCategory, setSelectedCategory]:any = useState(null)
  const queryClient = useQueryClient();

  async function fetchSubCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      const res = await getSubCategoryApi(payload);
     return res?.data
     
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      
    }
  }

  const { isFetching,  data: SubCategoryData } = useQuery({
    queryKey: ["sub-categoryData"],
    queryFn: fetchSubCategoryData,
  });

  // Function to create Blob from buffer
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

  const data: SubCategory[] = SubCategoryData?.map((item: any) => ({
    subcategoryID: item?.id,
    name: item.name,
    images: item.image ? createBlobFromBuffer(item.image.buffer, item.image.mimetype) : null,
  }));
  const handleDeleteSubCategory = async (id:any) => {
    try {
        const payload = {
            Authorization: `Bearer ${cookie.auth}`,
        };

        const res = await deleteSubCategoryApi(payload, id);
        console.log(res, "Delete successful");

        toast.success("Category deleted successfully");
    } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category. Please try again later.");
    }
};
const deleteMutation = useMutation({
  mutationFn:handleDeleteSubCategory ,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey:  ["sub-categoryData"] });
  },
});

const onDelete = useCallback((category: any) => {
  deleteMutation.mutate(category.subcategoryID , {
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
  
  const columns = useMemo(() => getSubCategoryColumns({ onEdit, onDelete }), [
  onDelete,
  onEdit,
  ]);
  return (
    <TableCard className="h-full">
    <Toaster/>
<CardHeader>
<CardTitle>Manage Category</CardTitle>
<div className="flex justify-between">
  <div />
  <div className="flex-nowrap">
    <UpdateSubCategoryForm
      isOpen={isDialogOpen}
      subcategory={selectedCategory}
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
<div className="-mt-20">
       {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
       </div>
</CardContent>
</TableCard>
  );
};

export default ManageSubCategory;
