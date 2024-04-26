
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";




interface HeaderProps{
    label: string;
}
const  Header = ({label}:HeaderProps) => {
 const location = useLocation()
 const isUserRegisterPage = location.pathname === "/user/register";
 const isAdminRegisterPage = location.pathname === "/admin/register";
 const isUserLoginPage = location.pathname === "/user/login";
 const isAdminLoginPage = location.pathname === "/admin/login";
 const isSuperAdminLogin = location.pathname === "/super-admin/login";
 const isDefaultPage = location.pathname === "/";

  return (
    <div className="flex flex-col gap-y-4 items-center">
      
        <h1 className={`lg:text-3xl font-bold text-2xl
                         ${isUserLoginPage || isDefaultPage || isUserRegisterPage
                          ? "text-[#7346da]"
                          : isAdminLoginPage || isAdminRegisterPage
                          ? "text-[#79a9ed]"
                          : isSuperAdminLogin
                          ? "text-red-500"
                          : "default"} 
                        `}>
         {
          isUserRegisterPage ||  isAdminRegisterPage ? 'Register': 'Welcome Back'
         }
          
        </h1>
       {  !isAdminRegisterPage && !isUserRegisterPage && <p className="text-muted-foreground text-lg font-semibold ">
            {label}
        </p>}
    </div>
  )
}

export default Header