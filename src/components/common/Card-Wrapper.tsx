

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
    <Card className="lg:relative lg:w-[950px] relative right-[30px] w-[300px]">
      
        <div >
          <img src={image} alt="" className={`lg:h-24 lg:ml-10 lg:mt-2  h-16 m-4`} />
        </div>
      <div className={`${isUserRegisterPage || isAdminRegister ? 'lg:w-10/12 lg:-top-[7px] lg:left-[80px]' : 'lg:w-4/12'} lg:mx-auto absolute lg:top-10 lg:left-80 left-30 top-16`}>
        <CardHeader >
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>

        {!isSuperAdminLogin && <CardFooter className="flex justify-center">
          {backButtonLabel != '' && (
            <div onClick={clickHandler}>
              <div className={`cursor-pointer lg:fixed lg:top-[580px] ${isRegister ? 'lg:left-[650px] lg:top-[600px] ': isAdminForgotPassoword || isUserForgotPassoword || isSAForgotPassoword ? 'lg:left-[720px]': 'lg:left-[630px]'}`}>{part1} ?<span className={`cursor-pointer lg:fixed  ${isRegister ? 'lg:top-[600px]': 'lg:top-[580px]'}  lg:left-[810px]
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