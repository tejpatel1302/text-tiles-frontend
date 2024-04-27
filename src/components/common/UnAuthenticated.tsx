import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";

type Props = {
  children: JSX.Element;
};

const UnAuthenticated: React.FC<Props> = ({ children }) => {
  const [cookie] = useCookies(["auth"]);
 

  return !cookie.auth ? children : <Navigate to={"/admin/orders"} replace />;
};

export default UnAuthenticated;
