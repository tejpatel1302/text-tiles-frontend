import { Outlet } from "react-router-dom";
import "./App.css";
import CommonNavBar from "./components/common/CommonNavBar";
import SideBar from "./components/common/SideNavBar";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'

import UserLogin from "./User/user pages/UserLogin";

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
  const isPTB = location.pathname === "/user/checkout";
  const isPayment = location.pathname === "/user/payment";
  const isForgotPassword = location.pathname === "/admin/forgot-password";
  const isUserForgotPassword = location.pathname === "/user/forgot-password";
  const isSAForgotPassword = location.pathname === "/super-admin/forgot-password";
  const isAdminRegister = location.pathname === "/admin/register";
  const isMyAccount = location.pathname === "/user/details";
  const isMyAddressBook = location.pathname === "/user/address-book";
  const isSuperAdminLogin = location.pathname === "/super-admin/login";
  const isDefaultPage = location.pathname === "/"
  const isAdminDashboard = location.pathname.startsWith("/admin");
  const isSuperAdminDashboard = location.pathname.startsWith("/super-admin");
  const isUserDashboard = location.pathname.startsWith("/user");
  
  
  return (
    <>
      <div>
        {/* bg- dynamic */}
        
       {(!isAdminLoginPage  && !isUserLoginPage && !isUserRegisterPage  && !isForgotPassword && !isAdminRegister && !isSuperAdminLogin && !isDefaultPage &&!isSAForgotPassword && !isUserForgotPassword) &&  <div className={`${ isUserDashboard ? 'bg-[#7346da]': isAdminDashboard ? "bg-[#79a9ed]" : isSuperAdminDashboard ? 'bg-red-500' : ''}`}>
          <CommonNavBar />
        </div>}
        <div className="flex">
          {/* border dynamic */}
         {(!isAdminLoginPage  && !isUserWebsite && !isUserLoginPage  && !isUserCategory && !isUserSubCategory  && !selectedCategories && !cart && !isUserRegisterPage && !isProducts && !isWishList && !isPTB && !isPayment && !isForgotPassword && !isAdminRegister && !isSuperAdminLogin && !isDefaultPage &&!isSAForgotPassword && !isUserForgotPassword ) && <div className={`${isUser ? 'bg-white': 'bg-white'}`}>
            {" "}
            <SideBar />
         
          </div>}
          <div className={` w-full min-h-screen  ${(isAdminLoginPage || isUserLoginPage || isUserRegisterPage || isForgotPassword || isAdminRegister || isSuperAdminLogin || isDefaultPage || isSAForgotPassword || isUserForgotPassword) ? `grid-bg ${(isUserLoginPage || isDefaultPage || isUserRegisterPage || isUserForgotPassword) ? 'bg-gradient-to-br from-purple-400 to-[#6534d9]' : isAdminLoginPage || isAdminRegister || isForgotPassword? 'bg-gradient-to-br from-[#79a9ed] to-[#092756]' : (isSuperAdminLogin || isSAForgotPassword ) ? 'bg-gradient-to-br from-red-500 to-black' : ''} ba-grid anim`:'min-h-screen bg-white'}` }>
           {
            (isAdminLoginPage || isUserLoginPage || isUserRegisterPage ||  isForgotPassword || isAdminRegister || isSuperAdminLogin || isDefaultPage ||  isSAForgotPassword || isUserForgotPassword ) ? (
            <div className="inner">
              <div>
                { isDefaultPage ? <UserLogin/> : <Outlet/>
                  
                  }
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
