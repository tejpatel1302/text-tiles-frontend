
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";




interface HeaderProps{
    label: string;
}
const  Header = ({label}:HeaderProps) => {
 const location = useLocation()
 const isUserRegisterPage = location.pathname === "/user/register";

  return (
    <div className="flex flex-col gap-y-4 items-center">
        <h1 className={cn('text-3xl font-bold text-[#6534d9]')}>
         {
          isUserRegisterPage ? 'Welcome to Family': 'Welcome Back'
         }
          
        </h1>
        <p className="text-muted-foreground text-lg font-semibold ">
            {label}
        </p>
    </div>
  )
}

export default Header