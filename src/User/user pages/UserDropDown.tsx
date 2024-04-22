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

export function UserDropDown() {
const navigate = useNavigate()
  const [position, setPosition] = React.useState("bottom")

  function clickHandler(){
    navigate('/user/order-history')
  }
  
  function clickHandler2(){
    navigate('/user/account')
  }
  function clickHandler3(){
    navigate('/user/products')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <UserRound size={35}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hi, Monesh</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="left"  onClick={clickHandler3}>Home</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="top"  onClick={clickHandler2}>My Account</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom" onClick={clickHandler}>Order History</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Logout</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
