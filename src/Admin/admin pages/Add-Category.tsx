import * as z from "zod";
import { AddCategorySchema } from "@/utils/schemas";

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

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { addCategoryApi, uploadApi } from "@/features/api/apicall";



const AddCategory = ({ redirect }: any) => {
  const navigate = useNavigate();
  
  const token = useSelector(selectAdminCurrentToken)
  console.log(token, 'admin token')
  const form = useForm<z.infer<typeof AddCategorySchema>>({
    defaultValues: {
      name: "",
      description: "",
      file: null
    },
    mode: 'onChange',
    resolver: zodResolver(AddCategorySchema),
    
  });
  
  //  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  const submitData = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', ' '); 
      formData.append('file', data.file[0]);
console.log(formData,'hiiiiiiiiiiiiiiii')
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
      };

      const res = await addCategoryApi(formData, config);
      console.log(res, 'addedsubmitData');
      
      
      

  } catch (error) {
      console.error("Error fetching product data:", error);
  }

  };

  
  const fileRef = form.register('file', { required: true });
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
                    name="name"
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
                  {/* <FormField
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
                  /> */}
                 
                

             
                
                  
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <div>
                        <FormItem className="flex items-center">
                          <FormLabel className="w-36">Image:</FormLabel>
                          <FormControl>
                          <Input {...fileRef} type="file" />
                          {/* onChange={handleImageChange}  */}
                          </FormControl>
                        </FormItem>
                        <div className="flex justify-center mx-auto gap-5 my-4">
                          <Button
                            type="submit"
                          
                            className="px-16"
                            variant={"skyblue"}
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