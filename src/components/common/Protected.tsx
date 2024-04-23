import { selectAdminCurrentToken} from "@/features/redux_toolkit/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const Protected: React.FC<Props> = ({ children }) => {
  const token = useSelector(selectAdminCurrentToken);

  const location = useLocation().pathname;

  return token ? (
    children
  ) : (
    <Navigate to={"/admin/login"} state={{ from: location }} replace />
  );
};

export default Protected;
