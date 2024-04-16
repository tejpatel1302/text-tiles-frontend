

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import Header from "../../components/core/CheckoutPage/Header"

import BackButton from "../../components/core/LoginPages/Back-Button"
import { useLocation } from "react-router-dom"


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
   
};

const Card2 = ({children,
    headerLabel,
  
    }: CardWrapperProps) => {
      const location = useLocation()
      const isPayment = location.pathname === "/user/payment";
  return (
    <Card className={`w-full ${isPayment ? 'h-screen':'h-screen'} shadow-md border-2 border-purple-400`}>
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
       <CardContent>
       {children}
       </CardContent>
      
       
       <CardFooter className="flex justify-center">
       
       </CardFooter>
    </Card>
  )
}

export default Card2