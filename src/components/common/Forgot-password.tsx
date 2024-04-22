


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
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";





const ForgotPassword = () => {
 const location = useLocation()
 const [displayResetForm, setDisplayResetForm] = useState(false)
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",    
     
    },
  });

 
  const submitData = (data: any) => {
console.log(data)
  };
   
  const submitData2 = (data: any) => {
    console.log(data)
      };
  const isForgotPassword = location.pathname === "/admin/forgot-password";
  const isUserForgotPassword = location.pathname === "/user/forgot-password";
  const isSAForgotPassword = location.pathname === "/super-admin/forgot-password";

  function clickHandler(){
    setDisplayResetForm(true)
  }
  
  function clickHandler2(){
    setDisplayResetForm(false)
  }
    return (
      <div className="z-10 absolute left-[20%]">
         <div className="h-screen flex justify-center items-center">
      {!displayResetForm &&   <CardWrapper
          headerLabel="Forgot Password ?"
          backButtonHref={`${
            isUserForgotPassword 
              ? "/user/login"
              : isForgotPassword 
              ? "/admin/login"
              : isSAForgotPassword ? '/super-admin/login': ''
          }`}
          backButtonLabel="Back to Login"
         
        >
           <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)} className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                    <Mail  className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `}
                    />
                    <FormLabel>Email</FormLabel>
                     
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your Email"
                          type="email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
     <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                        <Calendar  className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `}
                    />
                      <FormLabel>DOB</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your Date of Birth"
                          type="date"
                          className="pl-10"
                          
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
              </div>
    
              <Button size={"lg"} type="submit" className="w-full" onClick={clickHandler}>
                Send Reset Email
              </Button>
            </form>
          </Form>
         
        </CardWrapper>}
        {displayResetForm &&   <CardWrapper
          headerLabel="Forgot Password ?"
          backButtonHref={`${
            isUserForgotPassword 
              ? "/user/login"
              : isForgotPassword 
              ? "/admin/login"
              : isSAForgotPassword ? '/super-admin/login': ''
          }`}
          backButtonLabel=""
         
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData2)} className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                    <LockIcon  className={`relative top-16 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `}
                    />
                    <FormLabel>New Password</FormLabel>
                     
                      <FormControl>
                      <PasswordInput className="px-10" />
                      </FormControl>
                    </FormItem>
                  )}
                />
     <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                        <LockIcon  className={`absolute top-10 left-2  
                         ${
                          isUserForgotPassword
                             ? "text-[#7346da]"
                             : isForgotPassword
                             ? "text-[#79a9ed]"
                             : isSAForgotPassword
                             ? "text-red-500"
                             : "default"
                         } 
                        `}
                    />
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                      <PasswordInput className="px-10" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
              </div>
              <div className="flex gap-2">
              <Button size={"lg"} type="submit" className="w-full" onClick={clickHandler2}>
               Back
              </Button>
              <Button size={"lg"} type="submit" className="w-full">
                Submit
              </Button>
              </div>
            </form>
          </Form>
         
        </CardWrapper>}
       </div>
      </div>
      );
  }

  
  


export default ForgotPassword;
