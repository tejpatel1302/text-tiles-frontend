import { Nav } from "../ui/nav";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  ChevronRight,
  File,
  FilePlus2Icon,
  Heart,
  Home,
  HomeIcon,
  InfoIcon,
  LogOut,
  PackageSearch,
  PlusIcon,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { IdCardIcon } from "@radix-ui/react-icons";
import { useAdminLogoutMutation, useUserLogoutMutation } from "@/features/api/authApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/redux_toolkit/authSlice";
import { userlogOut } from "@/features/redux_toolkit/userAuthSlice";

type Props = {};

export default function SideBar({ }: Props) {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const userOrderHistory = location.pathname === "/user/cart";
  const userSelected = location.pathname === "/user/selected-categories"
  const userHistory = location.pathname === "/user/order-history"
  const isOrderDetails = location.pathname === "/user/order-details";
  const isMyAccount = location.pathname === "/user/details";  
  const isMyAddressBook = location.pathname === "/user/address-book";
  const isMyPaymentMethods = location.pathname === "/user/payment-methods";
  const isSuperAdminOrders = location.pathname === "/super-admin/orders";
  const isSuperAdminReport = location.pathname === "/super-admin/order-report";
  const isUserReport = location.pathname === "/user/order-report";
  const isAdminReport = location.pathname === "/admin/order-report";
  const isSuperAdminDetails = location.pathname === "/super-admin/order-details";
  const [isCollapsed, setIsCollapsed] = useState(false);

  // function toggleSideBar() {
  //   setIsCollapsed(!isCollapsed);
  // }
  const [adminLogoutTrigger] = useAdminLogoutMutation(); // Destructure the trigger function from the tuple
const [userLogoutTrigger] = useUserLogoutMutation(); 
const clickHandler = async () => {
  try {
    let userData: any;
    if (location.pathname.startsWith("/admin")) {
      const adminLogout = await adminLogoutTrigger(); // Call the trigger function
      console.log('hi admin');
      dispatch(logOut());
      navigate('/admin/login');
    } else if (location.pathname.startsWith("/user")) {
      const userLogout = await userLogoutTrigger(); // Call the trigger function
      dispatch(userlogOut());
      navigate('/user/login');
    } else {
      throw new Error('Invalid login path');
    }

    console.log(userData);

    // navigate(state.from ? state.from : redirect); something wrong

  } catch (err) {
    console.log(err);
  }
};

  // Define links array based on userOrderHistory
  const links: any = (userOrderHistory || userSelected || userHistory || isOrderDetails || isUserReport)
    ? [
      {
        title: "Home",
        href: "/user/products",
        icon: Home,
        variant: "purple",
      },
      {
        title: "Order History",
        href: "/user/order-history",
        icon: PackageSearch,
        variant: "ghost",
      },
      {
        title: "Wish List",
        href: "/user/wishlist",
        icon: Heart,
        variant: "ghost",
      },
      {
        title: "Order-Report",
        href: "/user/order-report",
        icon: File,
        variant: "skyblue",
      },
      {
        title: "My Account",
        href: "/user/details",
        icon: User,
        variant: "ghost",
      },
    ] : (isMyAccount || isMyAddressBook || isMyPaymentMethods)? [
      {
        title: "My Details",
        href: "/user/details",
        icon: InfoIcon,
        variant: "ghost",
      },
      {
        title: "My Orders",
        href: "/user/order-history",
        icon: ShoppingCart,
        variant: "purple",
      },
      {
        title: "Address Book",
        href: "/user/address-book",
        icon: HomeIcon,
        variant: "ghost",
      },
      {
        title: "Payment Methods",
        href: "/user/payment-methods",
        icon: IdCardIcon,
        variant: "ghost",
      },
      
    ] : (isSuperAdminOrders || isSuperAdminDetails || isSuperAdminReport)? [
    
      {
        title: "My Orders",
        href: "/super-admin/orders",
        icon: ShoppingCart,
        variant: "purple",
      },
      {
        title: "Order-Report",
        href: "/super-admin/order-report",
        icon: File,
        variant: "skyblue",
      },
    
    ] : [
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
        variant: "purple",
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: PackageSearch,
        variant: "ghost",
      },
      {
        title: "Add Products",
        href: "/admin/add-products",
        icon: PlusIcon,
        variant: "ghost",
      },
      {
        title: "Add Category",
        href: "/admin/add-category",
        icon: FilePlus2Icon,
        variant: "ghost",
      },
      {
        title: "Add Sub-Category",
        href: "/admin/add-sub-category",
        icon: FilePlus2Icon,
        variant: "ghost",
      },
   
      {
        title: "Manage Category",
        href: "/admin/manage-category",
        icon: Settings,
        variant: "ghost",
      },
      {
        title: "Manage Sub-Category",
        href: "/admin/manage-sub-category",
        icon: Settings,
        variant: "ghost",
      },
    ]



  return (
    <div className="relative min-w-[200px]  px-10 pb-10  space-y-14 min-h-screen  flex flex-col justify-center ">


      <Nav isCollapsed={isCollapsed} links={links} />

      <div className="flex justify-center">
        {isCollapsed ? (
          <Button className="text-white" onClick={clickHandler}>
            <LogOut />
          </Button>
        ) : (
          <Button onClick={clickHandler} className="text-sm p-5">Logout</Button >
        )}
      </div>
    </div>
  );
}
