import { DataTable } from "@/components/common/Data-table";
import { SubCategory, columns } from "@/utils/sub-category-column";
import { getSubCategoryApi } from "@/features/api/apicall";
import { useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useEffect, useState } from "react";

const ManageSubCategory = () => {
  const token = useSelector(selectAdminCurrentToken);

  const [showSubCategory, setShowSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSubCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
      };
      
      const res = await getSubCategoryApi(payload);
      setShowSubCategory(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
console.log(showSubCategory)
  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  const data: SubCategory[] = showSubCategory.map((item: any) => ({
    subcategoryID: item.id,
    name: item.name,
    // Handle image here if needed
    images: item.image ? URL.createObjectURL(new Blob([item.image.buffer], { type: item.image.mimetype })) : null,
  }));

  return (
    <div className="bg-white">
      <div className="text-3xl font-bold">Sub-Category Management</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default ManageSubCategory;
