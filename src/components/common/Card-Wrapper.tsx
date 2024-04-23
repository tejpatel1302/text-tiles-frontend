

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Header from "../core/LoginPages/Header"
import BackButton from "../core/LoginPages/Back-Button"
import image from '../../assets/textiles-logo.png'
import { useLocation, useNavigate } from "react-router-dom"

interface CardWrapperProps {
  children: React.ReactNode,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean
};

const CardWrapper = ({ children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial }: CardWrapperProps) => {
  const location = useLocation()
  const isUserRegisterPage = location.pathname === "/user/register";
  const isAdminRegister = location.pathname === "/admin/register";
  const isUserLoginPage = location.pathname === "/user/login";
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isSuperAdminLogin = location.pathname === "/super-admin/login";
  const isAdminForgotPassoword = location.pathname === "/admin/forgot-password";
  const isDefaultPage = location.pathname === "/";
  const isRegister = location.pathname.includes("/register");
  const navigate = useNavigate()
  const isUserForgotPassoword = location.pathname === "/user/forgot-password";
  const isSAForgotPassoword = location.pathname === "/super-admin/forgot-password";

  function clickHandler() {
    navigate(backButtonHref)
  }

  const part2 = backButtonLabel.split("?")[1]
  const part1 = backButtonLabel.split("?")[0]
  return (
    // width and height dynamic
    <Card className="relative ">
      {(!isUserRegisterPage && !isAdminRegister) &&
        <div >
          <img src={image} alt="" className="h-40 ml-10 mt-2" />
        </div>}
      <div className={`${isUserRegisterPage || isAdminRegister ? 'w-10/12 -top-[1px] left-[80px]' : 'w-4/12'} mx-auto absolute top-10 left-80`}>
        <CardHeader >
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>

        {!isSuperAdminLogin && <CardFooter className="flex justify-center">
          {backButtonLabel != '' && (
            <div onClick={clickHandler}>
              <div className={`cursor-pointer fixed top-[590px]  ${isRegister ? 'left-[680px]': isAdminForgotPassoword || isUserForgotPassoword || isSAForgotPassoword ? 'left-[720px]': 'left-[650px]'}`}>{part1} ?<span className={`cursor-pointer fixed top-[590px] left-[830px]
                         ${isUserLoginPage || isDefaultPage || isUserRegisterPage
                          ? "text-[#7346da] "
                          : isAdminLoginPage || isAdminRegister
                          ? "text-[#79a9ed] "
                          : isSuperAdminLogin
                          ? "text-red-500"
                          : "default"} 
                        `}>{part2}</span></div>

            </div>
          )

          }
        </CardFooter>}
      </div>
    </Card>
  )
}

export default CardWrapper