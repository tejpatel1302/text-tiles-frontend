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
import { useCookies } from "react-cookie";
import { setCredentials3 } from "@/features/redux_toolkit/saSlice";


const Login = ({ redirect }: any) => {
  const dispatch = useDispatch()
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [cookie, setCookie] = useCookies([`auth`]);
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
    setMessage(""); // Clear any previous error messages
    
    try {
      let userData: any;
      if (location.pathname === '/admin/login') {
        userData = await login(data);
       
        dispatch(setCredentials(cookie.auth));
      
      } else if (location.pathname === '/user/login' || location.pathname === '/') {
        userData = await userLogin(data);
        
        dispatch(setCredentials(userData));
        // navigate(redirect);
      } else if (location.pathname === '/super-admin/login') {
        userData = await saLogin(data);
        
        dispatch(setCredentials(userData));
        
      } else {
        throw new Error('Invalid login path');
      }
 
     
      // Set cookie only if the request is successful
      if (userData?.data?.token) {
        setCookie(`auth`, userData.data.token);
        toast.success('Logged In SuccessFully');
        // setMessage("Logged In Successfully");
      } else {
        throw new Error('Token not received');
      }
      setTimeout(() => {
        navigate(redirect);
      }, 3000); 
    } catch (err) {
      console.log(err, 'hiiiiii');
      toast.error('Invalid Email and Password');
      setMessage("Login failed. Please try again.");
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
                    { !isSuperAdminLogin && <Button
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
                          Forgot Password ?
                      </Button>}
                        </Link>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className="text-red-500 text-center">{message}</div> 
      </CardWrapper>
   
    </div>
  );
};

export default Login;
