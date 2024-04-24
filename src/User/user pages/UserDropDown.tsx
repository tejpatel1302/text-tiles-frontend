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

export function UserDropDown() {
  const navigate = useNavigate()
  const [user, setUser] = React.useState([] as any);
  const [position, setPosition] = React.useState("bottom")
  const [loading, setLoading] = React.useState(true)
  const token = useSelector(selectUserCurrentToken);
  
  const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  
  React.useEffect(() => {
    console.log(token)

    async function fetchUserData() {
      try {
        const res = await getUserApi(headers);
        setUser(res?.data);
        console.log(res, 'getUser');
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false)
        navigate('/user/login')
      }
    }
    fetchUserData();
  }, [])
  function clickHandler() {
    navigate('/user/order-history')
  }

  function clickHandler2() {
    navigate('/user/account')
  }
  function clickHandler3() {
    navigate('/user/products')
  }

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
            <DropdownMenuLabel>Hi, {user.user.firstName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="left" onClick={clickHandler3}>Home</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="top" onClick={clickHandler2}>My Account</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom" onClick={clickHandler}>Order History</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Logout</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
