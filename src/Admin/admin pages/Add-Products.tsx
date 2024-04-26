import * as z from "zod";
import { AddProduct, LoginSchema } from "@/utils/schemas";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { addProductApi, getCategoryApi, getColorsApi, getSubCategoryApi } from "@/features/api/apicall";
import { useSelector } from "react-redux";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "sonner";

const AddProducts = ({ redirect }: any) => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory]: any = useState([]);
  const [showSubCategory, setShowSubCategory]: any = useState([]);
  const [showColors, setShowColors]: any = useState([]);
  const [cookie] = useCookies(["auth"]);
  const [selectedCategory, setSelectedCategory]: any = useState('');
  // const token = useSelector(selectAdminCurrentToken)
  const form = useForm<z.infer<typeof AddProduct>>({
    resolver: zodResolver(AddProduct),
    defaultValues: {
      name: '',
      description: '',
      material: '',
      price: '',
      size: '',
      colorId: '',
      file: '',
      categoryId: '',
      subcategoryId: ''
    },
    mode: 'all'
  });
  const items = [
    {
      id: "S",
      label: "S",
    },
    {
      id: "M",
      label: "M",
    },
    {
      id: "L",
      label: "L",
    },
    {
      id: "XL",
      label: "XL",
    },
    {
      id: "XXL",
      label: "XXL",
    },
    {
      id: "XXL",
      label: "XXL",
    },
  ] as const
  const submitData = async (data: any) => {
    console.log(data)
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('file', data.file[0]);
      formData.append('material', data.material);
      formData.append('price', data.price);
      formData.append('size', "L");
      formData.append('colorId', data.colorId);

      formData.append('subcategoryId', data.subcategoryId);

      console.log(formData, 'hiiiiiiiiiiiiiiii')
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const res = await addProductApi(formData, config);
      toast.success('Product Has Been Added');
      console.log(res, 'addedsubmitData');




    } catch (error) {
      console.error("Error fetching product data:", error);
    }

  };
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,

      };

      const res = await getCategoryApi(payload);
      console.log(res, 'getCategory')
      setShowCategory(res?.data);


    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  async function fetchColorsData() {
    try {
      const payload = {
        Authorization: `Bearer</FormItem> ${cookie.auth}`,

      };

      const res = await getColorsApi(payload);
      console.log(res, 'getColors')
      setShowColors(res?.data);


    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  async function fetchSubCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,

      };

      const res = await getSubCategoryApi(payload);
      console.log(res, 'getCategory')
      setShowSubCategory(res?.data);


    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  useEffect(() => {
    fetchCategoryData();
    fetchSubCategoryData();
    fetchColorsData();
  }, []);

  const handleCategoryChange = (value: string) => {
    console.log("Selected category:", value);
    const filteredSubcategories = showSubCategory.filter((subcategory: any) => subcategory?.categoryId == value);
    setShowSubCategory(filteredSubcategories);
    console.log("Filtered subcategories:", filteredSubcategories);
  };

  useEffect(() => {
    fetchSubCategoryData();
    handleCategoryChange(selectedCategory);
  }, [selectedCategory]);


  const fileRef = form.register('file', { required: true });
  return (
    <div className="max-h-screen">
       <Toaster position="top-center" />
      <div className="min-h-screen flex border-2 border-black w-9/12 rounded-md bg-white justify-center mx-auto p-10 my-4">
        <div className="text-3xl font-bold relative top-0 right-20">
          Add Products
        </div>
        <div>
          <div >
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
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="w-36">Product Name:</FormLabel>
                          <FormControl >
                            <Input
                              {...field}
                              placeholder="Enter your Product Name"
                              type="text"
                              className="w-[300px]"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-36">Description:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter Description"
                              type="text"
                              className="w-[300px]"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center ">
                          <FormLabel className="w-36">Price:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="        Enter Price"
                              type="number"
                              className="w-[300px]"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />

<FormField
          control={form.control}
          name="size"
          render={() => (
            <FormItem className="flex ">
              <div className="mb-4">
                <FormLabel className="mr-28">Sizes</FormLabel>
             
              </div>
             <div className="flex gap-5">
             {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="size"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl >
                         
                         <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                    
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                        
                      </FormItem>
                    )
                  }}
                />
              ))}
             </div>
             
            </FormItem>
          )}
        />
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-36">Material</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter Material"
                              type="text"
                              className="w-[300px]"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-36">Color:</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                showColors?.map((color: any) => {
                                  return (
                                    <SelectItem key={color?.id} value={color?.id}>{color?.name}</SelectItem>
                                  )
                                })
                              }
                            </SelectContent>
                          </Select>
                          {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link to="/examples/forms">email settings</Link>.
              </FormDescription> */}
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-36">Category:</FormLabel>
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            handleCategoryChange(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                showCategory?.map((category: any) => {
                                  return (
                                    <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
                                  )
                                })
                              }
                            </SelectContent>
                          </Select>
                          {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link to="/examples/forms">email settings</Link>.
              </FormDescription> */}
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subcategoryId"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-36">Sub-Category</FormLabel>
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            // handleCategoryChange(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Sub-Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                showSubCategory?.map((category: any) => {
                                  return (
                                    <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
                                  )
                                })
                              }
                            </SelectContent>
                          </Select>
                          {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link to="/examples/forms">email settings</Link>.
              </FormDescription> */}
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <div>
                        <FormItem >
                          <div className="flex items-center">
                            <FormLabel className="w-36">Image:</FormLabel>
                            <FormControl>
                              <Input {...fileRef} type="file" className="w-[300px]" />
                            </FormControl>
                          </div>
                          <FormMessage className="relative left-[105px]" />
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

export default AddProducts;

