import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import Protected from "./Protected";
import { useSelector } from "react-redux";
import { selectAdminCurrentUser} from "@/features/redux_toolkit/authSlice";

type Props = {
  children: JSX.Element;
};

const AdminProtected: React.FC<Props> = ({ children }) => {
    const user:any = useSelector(selectAdminCurrentUser);


  return (
    <Protected>
      {user?.adminId  ? (
        children
      ) : (
        <>
          <h1>Forbidden</h1>
          <Link to={"/user/products"}>Products</Link>
        </>
      )}
    </Protected>
  );
};

export default AdminProtected;
