import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProduct, UpdateProduct } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { updateProductApi } from "@/features/api/apicall";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
      id: "XXXL",
      label: "XXXL",
    },
  ] as const;
const UpdateProductForm = ({ isOpen, onOpenChange, product }: any) => {
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UpdateProduct>>({
    resolver: zodResolver(UpdateProduct),
    defaultValues: {
      name: "",
      description: "",
      material: "",
      price: 0,
      size: "",
    },
    mode: "all",
  });
  //   function handleProductUpdate(){

  //   }
  const handleProductUpdate = async (req: any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      // Initialize editedFields with the fields that must always be present

      // Send the edited fields in the request body
      const res = await updateProductApi(payload, req.id, req);
      console.log(res, "Update successful");

      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again later.");
    }
  };
  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["productData"] });

    onOpenChange(false);
  };
  const onRequestError = () => {
    toast("Error");
  };
  const updateMutation = useMutation({
    mutationFn: handleProductUpdate,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        size: product.size.split(","),
        material: product.material,
      });
    } else {
      form.reset();
    }
  }, [isOpen, product]);
  const onSubmit: any = (values: any) => {
    console.log(values)
    const req = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      size: values.size.join(","),
      material: values.material,
      // Add other fields here
    };

    updateMutation.mutate({ ...req, id: product.id });
  };
 
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Products</DialogTitle>
            <DialogDescription>
              Make changes to your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="w-24">Product Name:</FormLabel>
                        <FormControl>
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
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="w-24">Description:</FormLabel>
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
                    <FormItem>
                      <div className="flex items-center ">
                        <FormLabel className="w-24">Price:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Price"
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
                        <FormLabel className="mr-16">Sizes</FormLabel>
                      </div>
                      <div className="flex flex-col gap-5">
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
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: any) =>
                                                  value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
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
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="w-24">Material:</FormLabel>
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

                <Button
                  variant={"green"}
                  // disabled={!form.formState.isValid}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
          <DialogFooter>
            {/* <Button type="submit" variant={'green'} onClick={handle}>Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProductForm;
