import * as React from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?:React.ReactNode
 }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({suffix, className, type, ...props }, ref) => {
    // Define separate styling for radio inputs
    const radioStyle = type === "radio" ? { width: '15px', backgroundColor: "red" } : {};
    
    const inputClassName = cn(
      "flex h-10 w-full rounded-md border-2 border-black px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      type === "radio" ? "" : className, // Only apply additional classes if not a radio button
      type === "email" ? "px-10" : "" ,
      type === "password" ? "px-10" : "" ,
      type === "text" ? "px-10" : "" ,
      type === "tel" ? "px-10" : "" ,
      type === "date" ? "px-10" : ""

      
      
    );

    return (
      <div>
        <input
        type={type}
        style={{ ...radioStyle, ...props.style }} // Merge radioStyle with any custom styles passed via props
        className={inputClassName}
        ref={ref}
        {...props}
      />
      <div className="relative left-[210px] -top-8 cursor-pointer">
        {suffix}
      </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
