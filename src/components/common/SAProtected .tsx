import { selectAdminCurrentToken} from "@/features/redux_toolkit/authSlice";
import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const SAProtected: React.FC<Props> = ({ children }) => {
  const [cookie] = useCookies(["auth"]);
  console.log(cookie.auth)

  const location = useLocation().pathname;

  return cookie.auth ? (
    children
  ) : (
    <Navigate to={"/super-admin/login"} state={{ from: location }} replace />
  );
};

export default SAProtected;
