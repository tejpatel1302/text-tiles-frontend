import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "./Admin/admin pages/Orders.tsx";
import Products from "./Admin/admin pages/Products.tsx";
import AddProducts from "./Admin/admin pages/Add-Products.tsx";
import AddCategory from "./Admin/admin pages/Add-Category.tsx";
import AddSubCategory from "./Admin/admin pages/Add-SubCategory.tsx";
import ManageSubCategory from "./Admin/admin pages/Manage-SubCategory.tsx";
import ManageCategory from "./Admin/admin pages/Manage-Category.tsx";

import UserHistory from "./User/user pages/UserHistory.tsx";
import UserWebsite from "./User/user pages/UserWebsite.tsx";
import { Provider } from "react-redux";
import store from "./features/redux_toolkit/store.ts";
import Cart from "./User/user pages/Cart.tsx";
import AdminLogin from "./Admin/admin pages/Admin-Login.tsx";
import UserLogin from "./User/user pages/UserLogin.tsx";
import Category from "./User/user pages/Category.tsx";
import SubCategory from "./User/user pages/SubCategory.tsx";
import SelectedCategories from "./User/user pages/SelectedCategories.tsx";

import UserRegister from "./User/user pages/User-Register.tsx";

import AdminOrderDetails from "./Admin/admin pages/Order-Details.tsx";
import UserOrderDetails from "./User/user pages/UserOrderDetails.tsx";
import ProductInDetail from "./User/user pages/ProductsInDetail.tsx";
import WishList from "./User/user pages/WishList.tsx";
import UserWishList from "./User/user pages/WishList.tsx";
import ProceedToBuy from "./User/user pages/ProceedToBuy.tsx";
import Payment from "./User/user pages/Payment.tsx";
import ForgotPassword from "./components/common/Forgot-password.tsx";
import AdminRegister from "./Admin/admin pages/Admin-Register.tsx";

import MyDetails from "./User/user pages/MyDetails.tsx";
import AddressBook from "./User/user pages/AddressBook.tsx";
import SAOrders from "./Super Admin/super-admin-pages/SAOrders.tsx";
import SuperAdminLogin from "./Super Admin/super-admin-pages/Super-Admin-Login.tsx";
import UnAuthenticated from "./components/common/UnAuthenticated.tsx";
import Protected from "./components/common/Protected.tsx";
import PaymentMethods from "./User/user pages/PaymentMethods.tsx";
import { OrderReport } from "./utils/order-report.tsx";
import UserOrderReport from "./User/user pages/UserOrderReport.tsx";
import SAOrderDetails from "./Super Admin/SAOrderDetails.tsx";
import UserProtected from "./components/common/UserProtected.tsx";
import SAOrderReport from "./Super Admin/super-admin-pages/SAOrderReport.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SAProtected from "./components/common/SAProtected .tsx";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/admin/login",
        element: (
          <UnAuthenticated>
            <AdminLogin />
          </UnAuthenticated>
        ),
      },
      {
        path: "/admin/register",
        element: <AdminRegister />,
      },
      {
        path: "/super-admin/order-details",
        element: <SAProtected><SAOrderDetails/></SAProtected>,
      },
      {
        path: "/user/checkout",
        element: <UserProtected><ProceedToBuy /></UserProtected>,
      },
      {
        path: "/user/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/user/order-report",
        element: <UserProtected><UserOrderReport/></UserProtected>,
      },
      // {
      //   path: "/admin/order-report",
      //   element: <UserOrderReport/>,
      // },
      {
        path: "/super-admin/order-report",
        element:<SAProtected><SAOrderReport/></SAProtected>,
      },
      {
        path: "/user/payment-methods",
        element: <UserProtected><PaymentMethods/></UserProtected>,
      },
      // {
      //   path: "/super-admin/forgot-password",
      //   element: <ForgotPassword />,
      // },
      {
        path: "/user/payment",
        element: <UserProtected><Payment/></UserProtected>
      },
      {
        path: "/user/details",
        element: <UserProtected><MyDetails /></UserProtected>,
      },
     
      {
        path: "/user/register",
        element: <UserRegister />,
      },
      {
        path: "/user/order-details",
        element:<UserProtected><UserOrderDetails /></UserProtected>,
      },
      // {
      //   path: "/admin/order-details",
      //   element: <AdminOrderDetails />,
      // },
      {
        path: "/admin/order-details/:id",

        element: <Protected><AdminOrderDetails /></Protected>,
      },
      {
        path: "/user/order-details/:id",

        element: <UserProtected><UserOrderDetails /></UserProtected>,
      },
      {
        path: "/super-admin/order-details/:id",

        element: <SAProtected><SAOrderDetails /></SAProtected>,
      },
      
      {
        path: "/user/selected-categories",
        element: <UserProtected><SelectedCategories /></UserProtected>,
      },
      {
        path: "/user/login",
        element: <UserLogin/>,
      },
      {
        path: "/user/address-book",
        element: <UserProtected><AddressBook /></UserProtected>,
      },
      {
        path: "/super-admin/orders",
        element: <SAProtected><SAOrders /></SAProtected>,
      },
      {
        path: "/super-admin/login",
        element: <SuperAdminLogin />,
      },
      {
        path: "/user/category",
        element: (<UserProtected><Category /></UserProtected>),
      },
      {
        path: "/user/sub-category",
        element: <UserProtected><SubCategory /></UserProtected>,
      },
      {
        path: "/user/cart",
        element: <UserProtected><Cart /></UserProtected>,
      },
      {
        path: "/user/products",
        element: <UserProtected><UserWebsite title={"See What We Have to Offer"} /></UserProtected>,
      },
      {
        path: "/user/products/:productId",

        element: <UserProtected><ProductInDetail /></UserProtected>,
      },
      {
        path: "/user/wishlist",

        element: <UserProtected><UserWishList /></UserProtected>,
      },
      {
        path: "/user/order-history",
        element: <UserProtected><UserHistory /></UserProtected>,
      },
      {
        path: "/admin/orders",
        element: ( <Protected><Orders /></Protected>),
      },
      {
        path: "/admin/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/admin/products",
        element: (
          <Protected>
            <Products />
          </Protected>
        ),
      },
      {
        path: "/user/cart",
        element: <UserProtected><Cart /></UserProtected>,
      },
      {
        path: "/admin/add-products",
        element: <Protected><AddProducts /></Protected>,
      },
      {
        path: "/admin/add-category",
        element: <Protected><AddCategory /></Protected>,
      },
      {
        path: "/admin/add-sub-category",
        element: <Protected><AddSubCategory /></Protected>,
      },
      {
        path: "/admin/manage-sub-category",
        element: <Protected><ManageSubCategory /></Protected>,
      },
      {
        path: "/admin/manage-category",
        element: <Protected><ManageCategory /></Protected>,
      },
    ],
  },
]);
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
    <RouterProvider router={appRoutes} />
  </Provider>
  </QueryClientProvider>
  
);
