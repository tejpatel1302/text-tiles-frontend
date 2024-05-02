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
        element: <SAOrderDetails/>,
      },
      {
        path: "/user/checkout",
        element: <ProceedToBuy />,
      },
      {
        path: "/user/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/user/order-report",
        element: <UserOrderReport/>,
      },
      {
        path: "/admin/order-report",
        element: <UserOrderReport/>,
      },
      {
        path: "/super-admin/order-report",
        element: <SAOrderReport/>,
      },
      {
        path: "/user/payment-methods",
        element: <PaymentMethods/>,
      },
      {
        path: "/super-admin/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/user/payment",
        element: <Payment />,
      },
      {
        path: "/user/details",
        element: <MyDetails />,
      },
     
      {
        path: "/user/register",
        element: <UserRegister />,
      },
      {
        path: "/user/order-details",
        element: <UserOrderDetails />,
      },
      // {
      //   path: "/admin/order-details",
      //   element: <AdminOrderDetails />,
      // },
      {
        path: "/admin/order-details/:id",

        element: <AdminOrderDetails />,
      },
      {
        path: "/user/order-details/:id",

        element: <UserOrderDetails />,
      },
      {
        path: "/super-admin/order-details/:id",

        element: <SAOrderDetails />,
      },
      
      {
        path: "/user/selected-categories",
        element: <SelectedCategories />,
      },
      {
        path: "/user/login",
        element: <UserLogin/>,
      },
      {
        path: "/user/address-book",
        element: <AddressBook />,
      },
      {
        path: "/super-admin/orders",
        element: <SAOrders />,
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
        element: <SubCategory />,
      },
      {
        path: "/user/cart",
        element: <Cart />,
      },
      {
        path: "/user/products",
        element: <UserWebsite title={"See What We Have to Offer"} />,
      },
      {
        path: "/user/products/:productId",

        element: <ProductInDetail />,
      },
      {
        path: "/user/wishlist",

        element: <UserWishList />,
      },
      {
        path: "/user/order-history",
        element: <UserHistory />,
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
        element: <Cart />,
      },
      {
        path: "/admin/add-products",
        element: <AddProducts />,
      },
      {
        path: "/admin/add-category",
        element: <AddCategory />,
      },
      {
        path: "/admin/add-sub-category",
        element: <AddSubCategory />,
      },
      {
        path: "/admin/manage-sub-category",
        element: <ManageSubCategory />,
      },
      {
        path: "/admin/manage-category",
        element: <ManageCategory />,
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
