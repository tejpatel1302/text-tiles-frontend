
import { DataTable } from "@/components/common/Data-table";
import { getCategoryApi } from "@/features/api/apicall";
import { useAddCategoryMutation } from "@/features/api/productsApiSLice";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { category } from "@/utils/category";
import { Category, columns } from "@/utils/category-column";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ManageCategory = () => {
  const token = useSelector(selectAdminCurrentToken);
  // const{data: category}= useAddCategoryMutation()
  const [showCategory, setShowCategory]:any = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
       
      };
      
      const res = await getCategoryApi(payload);
      console.log(res, 'getCategory')
      setShowCategory(res?.data);
      setLoading(false);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategoryData();
    
  }, []);
  const data: Category[] = showCategory.map((item: any) => ({
  
    categoryID: item.id,
    categoryName: item.name, 
    images: item.image ? URL.createObjectURL(new Blob([item.image.buffer], { type: item.image.mimetype })) : null,
  
}));


  return (
    <div className="bg-white">
      <div className="text-3xl font-bold mt-10 ml-4 ">Category Management:</div>
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

export default ManageCategory;
