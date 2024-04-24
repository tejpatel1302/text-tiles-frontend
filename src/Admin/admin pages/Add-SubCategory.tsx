import * as z from "zod";
import { AddManageCategorySchema, LoginSchema } from "@/utils/schemas";
import CardWrapper from "@/components/common/Card-Wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import { Divide } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useSelector } from "react-redux";
import { addManageCategoryApi, getCategoryApi } from "@/features/api/apicall";
import { useEffect, useState } from "react";

const AddSubCategory = ({ redirect }: any) => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory]:any = useState([]);
  const token = useSelector(selectAdminCurrentToken)
  const form = useForm<z.infer<typeof AddManageCategorySchema>>({
    resolver: zodResolver(AddManageCategorySchema),
    defaultValues: {
      categoryId: "",
      name: "",
      description: "",
      file: ""
    },
  });
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
       
      };
      
      const res = await getCategoryApi(payload);
      console.log(res, 'getCategory')
      setShowCategory(res?.data);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  useEffect(() => {
    fetchCategoryData();
  }, []);
  const submitData = async (data: any) => {
    console.log(data)
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', ' '); // Set default value as empty string
      formData.append('file', data.file[0]);
      formData.append('categoryId', data.categoryId);
      
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
      };

      const res = await addManageCategoryApi(formData, config);
      console.log(res, 'addedsubmitData');
  } catch (error) {
      console.error("Error fetching product data:", error);
  }
  };

  const loginClickHanlder = () => {
    navigate(redirect);
  };
  const fileRef = form.register('file', { required: true });
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
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Category:</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              showCategory?.map((category:any)=>{
                                return(
                                  <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
                                )
                              })
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Product Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Product Name"
                            type="text" className="w-[300px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Description:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Description"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="w-36">Image:</FormLabel>
                        <FormControl>
                        <Input {...fileRef} type="file"  className="w-[300px]"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center mx-auto gap-5 my-4">
                    <Button
                      type="submit"
                      onClick={loginClickHanlder}
                      className="px-16"
                      variant={"skyblue"}
                    >
                      Add
                    </Button>
                  </div>
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
