
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from './Admin/admin pages/Orders.tsx';
import Products from './Admin/admin pages/Products.tsx';
import AddProducts from './Admin/admin pages/Add-Products.tsx';
import AddCategory from './Admin/admin pages/Add-Category.tsx';
import AddSubCategory from './Admin/admin pages/Add-SubCategory.tsx';
import ManageSubCategory from './Admin/admin pages/Manage-SubCategory.tsx';
import ManageCategory from './Admin/admin pages/Manage-Category.tsx';

import UserHistory from './User/user pages/UserHistory.tsx';
import UserWebsite from './User/user pages/UserWebsite.tsx';
import { Provider } from 'react-redux';
import store from './redux_toolkit/store.ts';
import Cart from './User/user pages/Cart.tsx';
import AdminLogin from './Admin/admin pages/Admin-Login.tsx';
import UserLogin from './User/user pages/UserLogin.tsx';
import Category from './User/user pages/Category.tsx';
import SubCategory from './User/user pages/SubCategory.tsx';
import SelectedCategories from './User/user pages/SelectedCategories.tsx';

import UserRegister from './User/user pages/User-Register.tsx';

import AdminOrderDetails from './Admin/admin pages/Order-Details.tsx';
import UserOrderDetails from './User/user pages/UserOrderDetails.tsx';
import ProductInDetail from './User/user pages/ProductsInDetail.tsx';
import WishList from './User/user pages/WishList.tsx';
import UserWishList from './User/user pages/WishList.tsx';



const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLogin/>,
      },
      {
        path: "/user/register",
        element: <UserRegister/>,
      },
      {
        path: "/user/order-details",
        element: <UserOrderDetails/>,
      },
      {
        path: "/admin/order-details",
        element: <AdminOrderDetails/>,
      },
      {
        path: "/user/selected-categories",
        element: <SelectedCategories/>,

      },
      {
        path: "/user/login",
        element: <UserLogin/>,
      },
      {
        path: "/user/category",
        element: <Category/>,
      },
      {
        path: "/user/sub-category",
        element: <SubCategory/>,
      },
      {
        path: "/user/cart",
        element: <Cart/>,

      },
      {
        path: "/user/products",
        element: <UserWebsite/>,
      },
      {
        path:'/user/products/:productId',

        element:<ProductInDetail/>
        
      },
      {
        path:'/user/wishlist',

        element:<UserWishList/>
        
      },
      {
        path: "/user/order-history",
        element: <UserHistory/>,
      },
      {
        path: "admin/orders",
        element: <Orders/>,
      },
      {
        path: "admin/products",
        element: <Products/>,
      },
      {
        path: "user/cart",
        element: <Cart/>,
      },
      {
        path: "admin/add-products",
        element: <AddProducts/>,
      },
      {
        path: "admin/add-category",
        element: <AddCategory/>,
      },
      {
        path: "admin/add-sub-category",
        element: <AddSubCategory/>,
      },
      {
        path: "admin/manage-sub-category",
        element: <ManageSubCategory/>,
      },
      {
        path: "admin/manage-category",
        element: <ManageCategory/>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={appRoutes}/>
  </Provider>
)
