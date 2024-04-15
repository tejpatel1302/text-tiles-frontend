import * as z from "zod";
import { AddCategorySchema, LoginSchema } from "@/utils/schemas";
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

import { Link, useNavigate } from "react-router-dom";
import { Divide } from "lucide-react";

const AddCategory = ({ redirect }: any) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof AddCategorySchema>>({
    defaultValues: {
      product_name: "",
      description: "",
      image: ""
    },
    mode: 'all',
    resolver: zodResolver(AddCategorySchema),
    
  });

  const submitData = (data: any) => {
    console.log(JSON.stringify(data,null,4));
    
  };

  const loginClickHanlder = () => {
    navigate(redirect);
  };

  return (
    <div className="max-h-screen">
      <div className="h-[600px] flex border-2 border-black w-9/12 rounded-md bg-white justify-center items-center mx-auto p-10 my-4">
        <div className="text-3xl font-bold relative -top-64 right-20">
          Add Category
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
                    name="product_name"
                    render={({ field }) => (
                      <FormItem >
                       <div className="flex items-center">
                       <FormLabel className="w-36">Product Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Product Name"
                            type="text"
                          />
                        </FormControl>
                       </div>
                        <FormMessage className="relative left-[105px]"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Description:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your Description "
                            type="text"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                 
                

             
                
                  
                  <FormField
                    control={form.control}
                    name="image"
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

export default AddCategory;
