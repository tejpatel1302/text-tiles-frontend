import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";

type Props = {
  children: JSX.Element;
};

const UnAuthenticated: React.FC<Props> = ({ children }) => {
    const token = useSelector(selectAdminCurrentToken)
 

  return !token ? children : <Navigate to={"/admin/orders"} replace />;
};

export default UnAuthenticated;
