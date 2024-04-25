import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/utils/schemas";
import CardWrapper from "@/components/common/Card-Wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";

import { ArrowBigDown, CalendarRange, LockIcon, Mail, Phone, UserRound } from "lucide-react";

import { PasswordInput } from "../ui/password-input";
import { useAdminregisterMutation, useUserregisterMutation } from "@/features/api/authApiSlice";

const Register = ({ redirect }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserRegisterPage = location.pathname === "/user/register";
  const isAdminRegisterPage = location.pathname === "/admin/register";
  const [register] = useAdminregisterMutation()
  const [userRegister] = useUserregisterMutation()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      phone: "",
      dob: "",
      password: "",
      confirm_password: "",
      email: "",
      gender: undefined as "Male" | "Female" | "Others" | undefined,
      lastName: "",
    },
    mode: 'all'
  });

  const submitData = async (data: any) => {
    try {
      console.log(data, 'registerData');

      const dobISOString = new Date(data.dob).toISOString();
      const adminFilteredData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: dobISOString,
        email: data.email,
        password: data.password
      };
      const userFilteredData = {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phoneNum: data.phone,
        dob: dobISOString,
        email: data.email,
        password: data.password
      };

      let userData: any;
      if (location.pathname === '/admin/register') {
        userData = await register(adminFilteredData);
        console.log(userData, 'admin reg');
      } else if (location.pathname === '/user/register') {
        userData = await userRegister(userFilteredData);
        console.log(userData, 'user reg');
      } else {
        throw new Error('Invalid registration path');
      }

      navigate(redirect);
    } catch (error) {
      console.error('Error occurred during registration:', error);
      // Handle error here, such as displaying an error message to the user
    }
  };



  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Register"
        backButtonHref={
          `${isUserRegisterPage
            ? "/user/login"
            : isAdminRegisterPage
              ? "/admin/login"
              : ""}`
        }
        backButtonLabel="Already Registered ? Login"
        showSocial
      >
        <div className="flex flex-col">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitData)} className="">
                <div className="flex justify-center gap-16 ">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="firstName" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <UserRound className={`absolute top-10 left-2 
                          ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                         `} />
                          <FormLabel className="w-[30%]">First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your First Name" // Fixed: corrected placeholder
                              type="text" // Fixed: corrected type
                            />
                          </FormControl>
                          <FormMessage className="relative left-[1px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <Phone className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your Phone Number" // Fixed: corrected placeholder
                              type="tel" // Fixed: corrected type to tel for phone number input
                            />
                          </FormControl>
                          <FormMessage className="relative left-[1px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <CalendarRange className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">
                            Date of Birth
                          </FormLabel>

                          <Input
                            {...field}
                            type="date"
                            className=""
                          />


                          <FormMessage className="relative left-[1px]" />     </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <LockIcon className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">Password</FormLabel>
                          <FormControl>
                            <PasswordInput className="px-10" {...field} />
                          </FormControl>

                          <FormMessage className="relative left-[1px] -top-[30px]" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="lastName" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <UserRound className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your Last Name" // Fixed: corrected placeholder
                              type="text" // Fixed: corrected type
                            />
                          </FormControl>
                          <FormMessage className="relative left-[1px] " />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <Mail className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your Email" // Fixed: corrected placeholder
                              type="email" // Fixed: corrected type
                            />
                          </FormControl>
                          <FormMessage className="relative left-[1px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <ArrowBigDown className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />

                          <div className="mt-3 space-y-2">
                            <FormLabel className="w-36">Gender:</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className={'border-2 border-black'}>
                                  <SelectValue placeholder="Select Your Gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Male", "Female", "Others"].map(
                                  (category) => {
                                    return (
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
                                        {category}{" "}
                                      </SelectItem>
                                    );
                                  }
                                )}
                              </SelectContent>
                            </Select>
                            {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link to="/examples/forms">email settings</Link>.
              </FormDescription> */}
                          </div>

                          <FormMessage className="relative left-[1px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirm_password" // Fixed: corrected name attribute
                      render={({ field }) => (
                        <FormItem className="relative">
                          <LockIcon className={`absolute top-10 left-2 
                         ${isUserRegisterPage
                              ? "text-[#7346da]"
                              : isAdminRegisterPage
                                ? "text-[#79a9ed]"
                                : ""} 
                        `} />
                          <FormLabel className="w-[30%]">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <FormControl>
                              <PasswordInput className="px-10" {...field} />
                            </FormControl>
                          </FormControl>
                          <FormMessage className="relative left-[1px] -top-[32px]" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    className="px-10 fixed left-[690px] top-[520px]"
                    variant={
                      isUserRegisterPage
                        ? "purple"
                        : isAdminRegisterPage
                          ? "skyblue"
                          : "default"
                    }
                  >
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

