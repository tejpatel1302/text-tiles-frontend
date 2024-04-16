


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
import { Calendar, Mail } from "lucide-react";





const ForgotPassword = () => {
 
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",    
     
    },
  });

 
  const submitData = (data: any) => {
console.log(data)
  };


  
    return (
      <div className="z-10 absolute left-[20%]">
         <div className="h-screen flex justify-center items-center">
         <CardWrapper
          headerLabel="Forgot Password ?"
          backButtonHref="/admin/login"
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
                    <Mail className="relative top-16 left-2 text-purple-400" />
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
                         <Calendar className="relative top-16 left-2 text-purple-400 " />
                      <FormLabel>DOB</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your Date of Birth"
                          type="date"
                          className="appearance-none pl-10"
                          
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
              </div>
    
              <Button size={"lg"} type="submit" className="w-full">
                Send Reset Email
              </Button>
            </form>
          </Form>
        </CardWrapper>
       </div>
      </div>
      );
  }

  
  


export default ForgotPassword;
