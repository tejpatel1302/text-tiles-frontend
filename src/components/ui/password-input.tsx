import * as React from "react";
import { cn } from "@/lib/utils";
import { useLinkClickHandler, useLocation } from "react-router-dom";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({className,...props }, ref) => {
    // Define separate styling for radio inputs
    
    
    const[showPassword, setShowPassword] = React.useState(false)
function clickHandler(){
    setShowPassword(false)
}
function clickHandler2(){
    setShowPassword(true)
}
    return (
      <div>
       <Input type={showPassword ? 'text':'password'} className={className} {...props} ref={ref} suffix={showPassword ? <EyeIcon className={'select-none'} onClick={clickHandler}/>:<EyeOffIcon className={'select-none'} onClick={clickHandler2}/>}  placeholder="**********"/>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
