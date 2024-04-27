import { getCategoryApi, getSubCategoryApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { addSubId } from "@/features/redux_toolkit/subIdSlice ";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useSelector((state: any) => state.categoryId);
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectUserCurrentToken);
  const [showSubCategory, setShowSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);


  async function fetchSubCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await getSubCategoryApi(payload);
      console.log(res, 'getSubCategory');

      // Filter the data based on categoryId
      const filteredSubCategory = res?.data.filter((data: any) => data.categoryId === categoryId);

      setShowSubCategory(filteredSubCategory);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  function clickHandler(id: any) {
    dispatch(addSubId(id))

    navigate('/user/products');
  }

  return (
    <div className="max-w-[90%] mx-auto mr-10">
      <div className="text-4xl font-bold mt-10 text-gray-600">Choose Your Sub-Category</div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex items-center gap-10 mt-10 flex-wrap">
          {showSubCategory.map(category => (
            <div key={category?.id} className="h-[500px] w-[400px] rounded-lg border border-gray-300 bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center" onClick={() => clickHandler(category?.id)}>
              <img className="h-96" src={`data:image/jpeg;base64,${category.image.buffer}`} alt={category?.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl text-center mt-5">{category?.name}</div>
              </div>
              <div className="px-6 py-4 flex items-center justify-between"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;
