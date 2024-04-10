

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
  const navigate = useNavigate()


  function clickHandler() {
    navigate(backButtonHref)
  }

  const part2 = backButtonLabel.split("?")[1]
  const part1 = backButtonLabel.split("?")[0]
  return (
    // width and height dynamic
    <Card className="relative ">
      {!isUserRegisterPage &&
        <div >
          <img src={image} alt="" className="h-40 ml-10 mt-2" />
        </div>}
      <div className={`${isUserRegisterPage ? 'w-10/12 top-[10px] left-[80px]' : 'w-4/12'} mx-auto absolute top-16 left-80`}>
        <CardHeader >
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>

        <CardFooter className="flex justify-center">
          {backButtonLabel != '' && (
            <div onClick={clickHandler}>
              <div>{part1} ?<span className="text-purple-800">{part2}</span></div>

            </div>
          )

          }
        </CardFooter>
      </div>
    </Card>
  )
}

export default CardWrapper