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

const AddProducts = ({ redirect }: any) => {
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
      <div className="h-[600px] flex border-2 border-black w-9/12 rounded-md bg-white justify-center mx-auto p-10 my-4">
        <div className="text-3xl font-bold relative top-0 right-20">
          Add Products:
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Price:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Product Name"
                            type="number"
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
                        <FormLabel className="w-28">Sizes:</FormLabel>
                        <FormControl>
                          <div className="flex gap-5">
                            <label
                              htmlFor=""
                              className="flex items-center gap-2"
                            >
                              S:
                              <Input
                                {...field}
                                placeholder="Large"
                                type="radio"
                                value="large"
                                className="radio-large"
                              />
                            </label>
                            <label
                              htmlFor=""
                              className="flex items-center gap-2"
                            >
                              M:
                              <Input
                                {...field}
                                placeholder="Large"
                                type="radio"
                                value="large"
                                className="radio-large"
                              />
                            </label>
                            <label
                              htmlFor=""
                              className="flex items-center gap-2"
                            >
                              L:
                              <Input
                                {...field}
                                placeholder="Large"
                                type="radio"
                                value="large"
                                className="radio-large"
                              />
                            </label>
                            <label
                              htmlFor=""
                              className="flex items-center gap-2"
                            >
                              {" "}
                              XL:
                              <Input
                                {...field}
                                placeholder="Extra Large"
                                type="radio"
                                value="extraLarge"
                                className="text-sm bg-red-500"
                              />
                            </label>
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
                        <FormLabel className="w-28">Color:</FormLabel>
                        <FormControl>
                          <div >
                            <select name="" id="" className="w-[400px] p-2 border-2 border-black">
                              <option value="">Red</option>
                              <option value="">Blue</option>
                              <option value="">Green</option>
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
                        <FormLabel className="w-28">Category:</FormLabel>
                        <FormControl>
                        <div >
                            <select name="" id="" className="w-[400px] p-2 border-2 border-black">
                              <option value="">Men</option>
                              <option value="">Women</option>
                              <option value="">Children</option>
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
                        <FormLabel className="w-28">Subcategory:</FormLabel>
                        <FormControl>
                        <div >
                            <select name="" id="" className="w-[400px] p-2 border-2 border-black">
                              <option value="">Shirt</option>
                              <option value="">T-Shirt</option>
                              <option value="">Pants</option>
                            </select>
                          </div>
                         
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

export default AddProducts;
