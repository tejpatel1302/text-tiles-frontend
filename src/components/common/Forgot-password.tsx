


import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/utils/schemas";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import CardWrapper from "./Card-Wrapper";
import { Calendar, LockIcon, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { useAdminForgotPassMutation, useUserForgotPassMutation } from "@/features/api/authApiSlice";
import { Toaster, toast } from "sonner";





const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isForgotPassword = location.pathname === "/admin/forgot-password";
  const isUserForgotPassword = location.pathname === "/user/forgot-password";
  const isSAForgotPassword = location.pathname === "/super-admin/forgot-password";

  const [displayResetForm, setDisplayResetForm] = useState(false);
  const [adminFP ] =   useAdminForgotPassMutation()
  const [userFP] =  useUserForgotPassMutation()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: ""
    },
    mode:'all'
  });

  const handleSubmit = (data: any) => {
    if (displayResetForm) {
      // Logic for submitting new password form
      console.log("Submitting new password:", data);
      // Perform any processing if needed
    } else {
      // Logic for submitting reset email form
      console.log("Submitting reset email:", data);
      setDisplayResetForm(true); // Switch to the state for setting new password
    }
  };

  const handleNewPasswordSubmit = async (data: any) => {
    // Logic for submitting form with new password
    const FilteredData = {
      email: data.email,
      newpassword: data.password
    };
    console.log("Submitting form with new password:", data);
    try {
      let userData: any;
      if (location.pathname === '/admin/forgot-password') {
        userData = await adminFP(FilteredData);
        if(userData?.data?.
          password
          ){
            
            toast.success('Password Updated');
            navigate('/admin/login')
          }
          else{
            navigate('/user/forgot-password')
            toast.error('Failed To Update Password');
          }
        
      } else if (location.pathname === '/user/forgot-password') {
        userData = await userFP(FilteredData);
        if(userData?.data?.
          password
          ){
            
            toast.success('Password Updated');
            setTimeout(() => {
              navigate('/user/login');
            }, 3000); 
          }
          else{
            navigate('/user/forgot-password')
            toast.error('Invalid Email');
          }
        
      // } else if (location.pathname === '/super-admin/login') {
      //   userData = await saLogin(data);
      } 
      else {
        throw new Error('Invalid login path');
       
      }
  
      console.log(userData);
      
      // navigate(state.from ? state.from : redirect); something wrong
      
    } catch (err) {
      console.log(err);
     
     
    }
  };
  
  return (
    <div className="z-10 absolute left-[20%]">
      <Toaster richColors/>
      <div className="h-screen flex justify-center items-center">
        <CardWrapper
          headerLabel="Forgot Password ?"
          backButtonHref={`${
            isUserForgotPassword
              ? "/user/login"
              : isForgotPassword
              ? "/admin/login"
              : isSAForgotPassword
              ? '/super-admin/login'
              : ''
          }`}
          backButtonLabel={displayResetForm ? "Back" : "Back to Login"}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {displayResetForm ? (
                        <LockIcon className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `} />
                      ) : (
                        <Mail className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `} />
                      )}
                      <FormLabel>{displayResetForm ? "New Password" : "Email"}</FormLabel>
                      <FormControl>
  {displayResetForm ? (
    <PasswordInput
      {...form.register("password")}
      className="px-10"
      placeholder="Enter New Password"
    
    />
  ) : (
    <Input
      {...field}
      placeholder="Enter your Email"
      type="email"
    />
  )}
</FormControl>

                      <FormMessage className="relative left-[1px]" />
                    </FormItem>
                  )}
                />
                {displayResetForm && (
                  <FormField
             
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem      className={'-mt-8'}>
                        <LockIcon className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `} />
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} className="px-10" />
                        </FormControl>
                        <FormMessage className="absolute left-[320px] w-40 top-[224px]" />
                      </FormItem>
                    )}
                  />
                )}
               
                {displayResetForm && (
                  <Button
                    size={"lg"}
                    type="submit"
                    className="w-full"
                    onClick={form.handleSubmit(handleNewPasswordSubmit)}
                  >
                    Submit
                  </Button>
                )}
               {!displayResetForm && (
  <Button
    size={"lg"}
    type="button" // Change type to "button"
    className="w-full mt-10"
    onClick={() => handleSubmit(form.getValues())} // Call handleSubmit directly
  >
    Send
  </Button>
)}
              </div>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default ForgotPassword;

  
  


