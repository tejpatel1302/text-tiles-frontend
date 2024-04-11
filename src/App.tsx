import { Outlet } from "react-router-dom";
import "./App.css";
import CommonNavBar from "./components/common/CommonNavBar";
import SideBar from "./components/common/SideNavBar";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'

function App() {
  const params = useParams()
 const {productId} = params
  const location = useLocation();
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isUserLoginPage = location.pathname === "/user/login";
  const isUserRegisterPage = location.pathname === "/user/register";
  const isUser = location.pathname === "/user/order-history";
  const isUserWebsite = location.pathname === "/user/products";
  const isWishList = location.pathname === "/user/wishlist";
  const isUserCategory = location.pathname === "/user/category";
  const isUserSubCategory = location.pathname === "/user/sub-category";
  const selectedCategories =  location.pathname === "/user/selected-categories";
  const cart =  location.pathname === "/user/cart";
  const isOrderDetails = location.pathname === "/user/order-details";
  const isProducts = location.pathname === `/user/products/${productId}`;

  
  return (
    <>
      <div className="border-4">
        {/* bg- dynamic */}
       {(!isAdminLoginPage  && !isUserLoginPage && !isUserRegisterPage) &&  <div className={`${(isUser || isOrderDetails) ? 'bg-white':'bg-[#7346da]'}`}>
          <CommonNavBar />
        </div>}
        <div className="flex">
          {/* border dynamic */}
         {(!isAdminLoginPage  && !isUserWebsite && !isUserLoginPage  && !isUserCategory && !isUserSubCategory  && !selectedCategories && !cart && !isUserRegisterPage && !isProducts && !isWishList) && <div className={`${isUser ? 'bg-white':'bg-white'}`}>
            {" "}
            <SideBar />
          </div>}
          <div className={` w-full min-h-screen  ${(isAdminLoginPage || isUserLoginPage || isUserRegisterPage) ? 'grid-bg ba-grid anim':'min-h-screen bg-neutral-50'}` }>
           {
            (isAdminLoginPage || isUserLoginPage || isUserRegisterPage) ? (<div className="inner">
              <div>
                <Outlet/>
              </div>
            </div>): (
              <Outlet/>
            )
           }
          </div>
        </div>
      </div>  
    </>
  );
}

export default App;
