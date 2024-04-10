import * as z from "zod";
import { LoginSchema } from "@/utils/schemas";
import CardWrapper from "@/components/common/Card-Wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import { ComboboxForm } from "./Combo-box";

const Register = ({ redirect }: any) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitData = (data: any) => {
    console.log(data);
    console.log("hello");
  };

  const loginClickHanlder = () => {
    navigate(redirect);
  };



  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Register"
        backButtonHref="/user/login" // dynamic
        backButtonLabel="Already Registered ? Login"
        showSocial
      >
        <div className="flex flex-col">
          <div  >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitData)}
                className="space-y-4"
              >
                <div className="flex justify-center gap-14">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">First Name</FormLabel>
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
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Phone</FormLabel>
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
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Date of Birth</FormLabel>
                          <div className="px-12 py-2 mr-[1px] border-[2px] border-black rounded-sm">
                            <input type="date" name="" id="" className="border-none " />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="**********"
                              type="password"
                            />
                          </FormControl>

                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4">
                    <FormField

                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Last Name</FormLabel>
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
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Email</FormLabel>
                          <FormControl >
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
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Gender</FormLabel>
                          <select className="px-24 py-2 mr-[1px] border-[2px] border-black rounded-sm">
                            <option value="">Male</option>
                            <option value="">Female</option>
                            <option value="">Others</option>
                          </select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="flex items-center ">
                          <FormLabel className="w-[30%]">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="**********"
                              type="password"
                            />
                          </FormControl>

                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Button className="px-10 relative left-72 " variant={'purple'}>
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>

        </div>
      </CardWrapper>


    </div>
  );
};

export default Register;
