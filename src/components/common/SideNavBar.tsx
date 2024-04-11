import { Nav } from "../ui/nav";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  ChevronRight,
  FilePlus2Icon,
  Heart,
  Home,
  LogOut,
  PackageSearch,
  PlusIcon,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useLocation } from "react-router-dom";

type Props = {};

export default function SideBar({ }: Props) {
  const location = useLocation();
  const userOrderHistory = location.pathname === "/user/cart";
  const userSelected = location.pathname === "/user/selected-categories"
  const userHistory = location.pathname === "/user/order-history"
  const isOrderDetails = location.pathname === "/user/order-details";

  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSideBar() {
    setIsCollapsed(!isCollapsed);
  }

  // Define links array based on userOrderHistory
  const links: any = (userOrderHistory || userSelected || userHistory || isOrderDetails)
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
        title: "My Account",
        href: "/user/account",
        icon: User,
        variant: "ghost",
      },
    ]
    : [
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
    ];

  return (
    <div className="relative min-w-[200px]  px-10 pb-10  space-y-14 min-h-screen  flex flex-col justify-center ">


      <Nav isCollapsed={isCollapsed} links={links} />

      <div className="flex justify-center">
        {isCollapsed ? (
          <Button className="text-white">
            <LogOut />
          </Button>
        ) : (
          <Button className="text-sm p-5">Logout</Button>
        )}
      </div>
    </div>
  );
}
