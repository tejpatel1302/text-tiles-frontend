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
import { LockIcon, Mail, UserRound } from "lucide-react";

const Login = ({ redirect }: any) => {
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
    <div className="h-screen flex justify-center items-center">
      <CardWrapper
        headerLabel="Login To Continue"
        backButtonHref="/user/register" // dynamic
        backButtonLabel="Don't have an account ? Register"
        showSocial
      >
        <div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitData)}
                className=""
              >
                <div className="">
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
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative bottom-4">
                        <LockIcon className="relative top-16 left-2 text-purple-400" />
                         <FormLabel>Password</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder="**********"
                            type="password"
                          />
                        </FormControl>
                        <div className="flex justify-center mx-auto gap-5">
                          <Button
                            type="submit"
                            onClick={loginClickHanlder}
                            className="px-7"
                            variant={"purple"}
                          >
                            Login
                          </Button>
                          <Button variant={"purple"} className="px-2" >
                            <Link to="/reset">Forgot Password ?</Link>
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};

export default Login;
