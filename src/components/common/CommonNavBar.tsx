import { Button } from "../ui/button";
import image from "../../assets/textiles-logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, setProducts } from "@/redux_toolkit/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import { UserDropDown } from "@/User/user pages/UserDropDown";

const CommonNavBar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { data: products } = useSelector((state: any) => state.product);

  const [filteredGlasses, setFilteredGlasses] = useState([]);
  const location = useLocation();
  const isUser = location.pathname === "/user/order-history";
  const isOrderDetails = location.pathname === "/user/order-details";
  const selectedCategories = location.pathname.startsWith("/user");

  console.log(selectedCategories);
  useEffect(() => {
    dispatch(fetchProducts(""));
  }, []);
  useEffect(() => {
    dispatch(setProducts(filteredGlasses));
  }, [filteredGlasses]);

  const navigate = useNavigate();
  function clickHandler() {
    navigate("/user/products");
  }
  // function navigateClickHandler(){
  //   navigate('/user/order-history')
  // }
  function clickHandler2(){
    navigate('/user/cart')
  }

  return (
    <div className="flex justify-between w-9/12 mx-auto p-3  ">
      <div className="h-20 w-20">
        <img src={image} alt="" />
      </div>
      {selectedCategories && (
        <div className="flex items-center justify-center gap-5">
          <div>
            <input
              type="text"
              name=""
              id=""
              className="border border-customSkyBlue h-10 w-[600px] p-2 placeholder-gray-400 rounded-full"
              placeholder="What you are Looking for ?"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <div
            className="absolute right-[530px]"
            onClick={() => {
              const filteredResult = products.filter((fproduct: any) => {
                if (fproduct.title.includes(searchInput)) {
                  return fproduct;
                }
              });

              setFilteredGlasses(filteredResult);
            }}
          >
            <Search />
          </div>
        </div>
      )}
      <div className="flex items-center gap-5">
        {!selectedCategories ? (
          <Button onClick={clickHandler}>View Website</Button>
        ) : (
          <div className="flex gap-8 ">
            {!isUser && !isOrderDetails && (
              <div className="flex gap-8">
                <UserDropDown />
                <Heart size={35} />
              </div>
            )}
            <ShoppingCart size={35}  onClick={clickHandler2}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonNavBar;
