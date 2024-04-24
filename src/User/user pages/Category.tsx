import { getCategoryApi, getSubCategoryWithIDApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { addId } from "@/features/redux_toolkit/categoryIdSlice";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector(selectUserCurrentToken);
  

 
  const [showCategory, setShowCategory] = useState([]);

  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
      };
      console.log(payload,'payload')
      
      const res = await getCategoryApi(payload);
      console.log(res, 'getCategory');
      setShowCategory(res?.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  // async function fetchSubCategoryData(id:any) {
  //   try {
  //     const payload = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     console.log(payload,'payload')
      
  //     const res = await getSubCategoryWithIDApi(payload,id);
  //     console.log(res, 'getCategory');
  //     setShowCategory(res?.data);
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // }
  useEffect(() => {
    fetchCategoryData();
  }, []);

  function clickHandler(id:any) {
    dispatch(addId(id))

    navigate('/user/sub-category');
  }
  function clickHandler2() {
    

    navigate('/user/products');
  }

  return (
    <div className=" max-w-[90%] flex  flex-wrap mx-auto ">
      <div className="text-4xl font-bold mt-10 mx-12 text-gray-600 ">Choose Your Category</div>
      <div className="flex justify-center items-center gap-10 mt-10 flex-wrap" >
        {showCategory.map((category:any) => (
          <div key={category?.id} onClick={()=>{clickHandler(category?.id)}}className="h-[500px] w-[400px] rounded-lg border border-gray-300 bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
            <img className="h-96" src={`data:image/jpeg;base64,${category.image.buffer}`} alt={category?.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-center mt-5">{category?.name}</div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between"></div>
          </div>
        ))}
         <div  onClick={clickHandler2} className="h-[500px] w-[400px] rounded-lg border border-gray-300 bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
           
       
          </div>
      </div>
    </div>
  );
};

export default Category;
