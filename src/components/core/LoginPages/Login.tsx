import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockIcon, Mail } from "lucide-react";
import CardWrapper from "@/components/common/Card-Wrapper";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/utils/schemas";
import { PasswordInput } from "@/components/ui/password-input";

const Login = ({ redirect }: any) => {
  const location = useLocation();
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

  const isUserLoginPage = location.pathname === "/user/login";
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isSuperAdminLogin = location.pathname === "/super-admin/login";
  const isDefaultPage = location.pathname === "/";

  const loginClickHandler = () => {
    navigate(redirect);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <CardWrapper
        headerLabel="Login To Continue"
        backButtonHref={`${
          isUserLoginPage || isDefaultPage
            ? "/user/register"
            : isAdminLoginPage
            ? "/admin/register"
            : ""
        }`}
        backButtonLabel="Don't have an account ? Register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitData)}>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Mail
                      className={`relative top-16 left-2  
                         ${
                           isUserLoginPage || isDefaultPage
                             ? "text-[#7346da]"
                             : isAdminLoginPage
                             ? "text-[#79a9ed]"
                             : isSuperAdminLogin
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
                name="password"
                render={({ field }) => (
                  <FormItem className="relative bottom-4">
                    <LockIcon
                      className={`relative top-16 left-2  
                         ${
                           isUserLoginPage || isDefaultPage
                             ? "text-[#7346da]"
                             : isAdminLoginPage
                             ? "text-[#79a9ed]"
                             : isSuperAdminLogin
                             ? "text-red-500"
                             : "default"
                         } 
                        `}
                    />
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <FormControl>
                        <PasswordInput className="px-10" />
                      </FormControl>
                    </FormControl>
                    <div className="flex justify-center mx-auto gap-5">
                      <Button
                        type="submit"
                        onClick={loginClickHandler}
                        className="px-7"
                        variant={
                          isUserLoginPage || isDefaultPage
                            ? "purple"
                            : isAdminLoginPage
                            ? "skyblue"
                            : isSuperAdminLogin
                            ? "red"
                            : "default"
                        }
                      >
                        Login
                      </Button>
                      <Button
                        variant={
                          isUserLoginPage || isDefaultPage
                            ? "purple"
                            : isAdminLoginPage
                            ? "skyblue"
                            : isSuperAdminLogin
                            ? "red"
                            : "default"
                        }
                        className="px-2"
                      >
                        <Link
                          to={`${
                            isUserLoginPage || isDefaultPage
                              ? "/user/forgot-password"
                              : isAdminLoginPage
                              ? "/admin/forgot-password"
                              : isSuperAdminLogin
                              ? "/super-admin/forgot-password"
                              : ""
                          }`}
                        >
                          Forgot Password ?
                        </Link>
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default Login;
