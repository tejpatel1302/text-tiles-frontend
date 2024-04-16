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
  const isPTB = location.pathname === "/user/checkout";
  const isPayment = location.pathname === "/user/payment";
  const isForgotPassword = location.pathname === "/admin/forgot-password";
  const isAdminRegister = location.pathname === "/admin/register";
  const isMyAccount = location.pathname === "/user/details";
  const isMyAddressBook = location.pathname === "/user/address-book";

  
  return (
    <>
      <div>
        {/* bg- dynamic */}
        
       {(!isAdminLoginPage  && !isUserLoginPage && !isUserRegisterPage  && !isForgotPassword && !isAdminRegister ) &&  <div className={`${(isUser || isOrderDetails || isMyAccount || isMyAddressBook) ? 'bg-white':'bg-[#7346da]'}`}>
          <CommonNavBar />
        </div>}
        <div className="flex">
          {/* border dynamic */}
         {(!isAdminLoginPage  && !isUserWebsite && !isUserLoginPage  && !isUserCategory && !isUserSubCategory  && !selectedCategories && !cart && !isUserRegisterPage && !isProducts && !isWishList && !isPTB && !isPayment && !isForgotPassword && !isAdminRegister ) && <div className={`${isUser ? 'bg-white': isMyAccount || isMyAddressBook ? 'ml-52 border-2 border-gray-400': 'bg-white'}`}>
            {" "}
            <SideBar />
          </div>}
          <div className={` w-full min-h-screen  ${(isAdminLoginPage || isUserLoginPage || isUserRegisterPage || isForgotPassword || isAdminRegister) ? 'grid-bg ba-grid anim':'min-h-screen bg-white'}` }>
           {
            (isAdminLoginPage || isUserLoginPage || isUserRegisterPage ||  isForgotPassword || isAdminRegister) ? (<div className="inner">
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
