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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/utils/schemas";
import { PasswordInput } from "@/components/ui/password-input";
import { setCredentials } from "@/features/redux_toolkit/authSlice";
import { setCredentials2 } from "@/features/redux_toolkit/userAuthSlice";
import { useDispatch } from "react-redux";
import { useAdminloginMutation, useSaloginMutation, useUserloginMutation} from "@/features/api/authApiSlice";
import { useState } from "react";
import { Toaster, toast } from 'sonner'
import { setCredentials3 } from "@/features/redux_toolkit/saSlice";


const Login = ({ redirect }: any) => {
  const dispatch = useDispatch()
  const location = useLocation();
  const state = useLocation().state;
  console.log(state)
  const navigate = useNavigate();
  const [login ] =   useAdminloginMutation()
  const [userLogin] =   useUserloginMutation()
  const [saLogin] =     useSaloginMutation()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode:"all"
  });
  const [loading, setLoading] = useState(false);

  const submitData = async (data: any) => {
    setLoading(true);
    console.log(data, 'hellooo')
    try {
      let userData: any;
      if (location.pathname === '/admin/login') {
        
        userData = await login(data);
       
        dispatch(setCredentials(userData));
      } else if (location.pathname === '/user/login') {
        userData = await userLogin(data);
       
        dispatch(setCredentials2(userData));
        navigate(redirect)
      } else if (location.pathname === '/') {
        userData = await userLogin(data);
        dispatch(setCredentials2(userData));
        navigate(redirect)
      } else if (location.pathname === '/super-admin/login') {
        userData = await saLogin(data);
        dispatch(setCredentials3(userData));
        navigate('/super-admin/orders')
       
      } else {
        throw new Error('Invalid login path');
      }
  
      console.log(userData);
      
      // navigate(state.from ? state.from : redirect); something wrong
      // navigate(redirect)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  const isUserLoginPage = location.pathname === "/user/login";
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isSuperAdminLogin = location.pathname === "/super-admin/login";
  const isDefaultPage = location.pathname === "/";



  return (
    <div className="h-screen flex justify-center items-center">
    <Toaster position="top-center" />
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
                    <FormMessage className="absolute left-[305px] top-[160px]"/>
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
                        <PasswordInput className="px-10" { ...field } />
                      </FormControl>
                    </FormControl>
                    <FormMessage className="absolute left-[280px] top-[30px]"/>
                    <div className="flex justify-center mx-auto gap-5">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="px-7"
                        onClick={() => toast.success('Logged In')}
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
                        {loading ? 'Loading...' : 'Login'}
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
