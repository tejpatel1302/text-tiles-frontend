"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice"
import { getUserApi } from "@/features/api/apicall"
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice"
import { Cookies, useCookies } from "react-cookie";
import { useAdminLogoutMutation, useUserLogoutMutation } from "@/features/api/authApiSlice"

export function UserDropDown() {
  const navigate = useNavigate()
  const [user, setUser] = React.useState([] as any);
  const [position, setPosition] = React.useState("bottom")
  const [loading, setLoading] = React.useState(true)
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectUserCurrentToken);
  
  const headers = {
      Authorization: `Bearer ${cookie.auth}`,
      'Content-Type': 'application/json'
    }
  
  React.useEffect(() => {
  

    async function fetchUserData() {
      try {
        const res = await getUserApi(headers);
        setUser(res?.data);
        console.log(res, 'getUser');
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false)
        // navigate('/user/login')
      }
    }
    fetchUserData();
  }, [])
  function clickHandler() {
    navigate('/user/order-history')
  }

  function clickHandler2() {
    navigate('/user/details')
  }
  
  const [adminLogoutTrigger] = useAdminLogoutMutation(); // Destructure the trigger function from the tuple
  const [userLogoutTrigger] = useUserLogoutMutation(); 
  const cookies = new Cookies()
  const logOutHandler = async () => {
    try {
      let userData: any;
      if (location.pathname.startsWith("/admin")) {
        const adminLogout = await adminLogoutTrigger({}); // Call the trigger function
        console.log('hi admin');
        cookies.remove(`auth`) 
        // dispatch(logOut());
        navigate('/admin/login');
      } else if (location.pathname.startsWith("/user")) {
        const userLogout = await userLogoutTrigger({});
        
        
        cookies.remove(`auth`) // Call the trigger function
        // dispatch(userlogOut());
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
  // if (user.user === undefined) {
  //   
  // }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserRound size={35} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <DropdownMenuLabel>Hi, {user?.user?.firstName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>

              <DropdownMenuRadioItem value="top" onClick={clickHandler2}>My Account</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom" onClick={clickHandler}>Order History</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right" onClick={logOutHandler}>Logout</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
