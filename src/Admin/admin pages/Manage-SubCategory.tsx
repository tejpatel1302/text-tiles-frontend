import { DataTable } from "@/components/common/Data-table";
import { SubCategory, columns } from "@/utils/sub-category-column";
import { getSubCategoryApi } from "@/features/api/apicall";
import { useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface ManageSubCategoryProps {
  // Add props if needed
}

const ManageSubCategory: React.FC<ManageSubCategoryProps> = () => {
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);
  const [showSubCategory, setShowSubCategory] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSubCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      const res = await getSubCategoryApi(payload);
      console.log(res,'hi')
      setShowSubCategory(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

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

  const processedData: SubCategory[] = showSubCategory.map((item: any) => ({
    subcategoryID: item?.id,
    name: item.name,
    images: item.image ? createBlobFromBuffer(item.image.buffer, item.image.mimetype) : null,
  }));

  return (
    <div className="bg-white">
      <div className="text-3xl font-bold mt-10 ml-4 ">Sub-Category Management</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
         <div className="-mt-12">
        <DataTable columns={columns} data={processedData} />
      </div>
      )}
    </div>
  );
};

export default ManageSubCategory;
