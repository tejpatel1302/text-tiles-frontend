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
import { Divide } from "lucide-react";

const AddSubCategory = ({ redirect }: any) => {
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
    <div className="max-h-screen">
      <div className="h-[600px] flex border-2 border-black w-9/12 rounded-md bg-white justify-center items-center mx-auto p-12 my-4">
        <div className="text-3xl font-bold relative -top-64 right-10">
          Add SubCategory 
        </div>
        <div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitData)}
                className="space-y-4"
              >
                <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-28">Category:</FormLabel>
                        <FormControl>
                          <div >
                            <select name="" id="" className="w-[400px] p-2 border-2 border-black rounded-md">
                              <option value="">Category 1</option>
                              <option value="">Category 2</option>
                              <option value="">Category 3</option>
                            </select>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Product Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Product Name"
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
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Description:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Description "
                            type="password"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                 
                

             
                
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <div>
                        <FormItem className="flex items-center">
                          <FormLabel className="w-36">Image:</FormLabel>
                          <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Product Name"
                            type="file"
                          />
                          </FormControl>
                        </FormItem>
                        <div className="flex justify-center mx-auto gap-5 my-4">
                          <Button
                            type="submit"
                            onClick={loginClickHanlder}
                            className="px-16"
                            variant={"purple"}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
