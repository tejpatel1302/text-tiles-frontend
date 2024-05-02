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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {  UpdateCartSchema, UpdateCategorySchema, UpdateProduct } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { cartUpdateApi} from "@/features/api/apicall";


const UpdateCartForm = ({ isOpen, onOpenChange, cart }: any) => {
    console.log(cart,'plezcata')
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UpdateCartSchema >>({
    resolver: zodResolver(UpdateCartSchema ),
    defaultValues: {
      quantity: "",
       
    },
    mode: "all",
  });
  //   function handleProductUpdate(){

  //   }
  const handleProductUpdate = async (productData:any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
  
      // Initialize editedFields with the fields that must always be present
      const editedFields: { quantity: number } = {
        quantity: Number(productData.quantity)
    };
  
      // Send the edited fields in the request body
      const res = await cartUpdateApi(
        payload,
        productData?.id,
        editedFields
      );
      console.log(res, "Update successful");
  

  
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again later.");
    }
  };
  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["cartData"] });

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
    if (cart ) {
        form.reset({
            quantity: cart?.quantity,
            
          });
    } else {
      form.reset();
    }
  }, [isOpen, cart ]);
  const onSubmit: any = (values: any) => {
    console.log(values)
    const req = {
        quantity: values?.quantity,
      // Add other fields here
    };

    updateMutation.mutate({ ...req, id: cart?.id
    });
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
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                       
                      <FormLabel htmlFor="name">Product Quantity:</FormLabel>
                        <FormControl>
                        
<Input
  type="number"
  id="quantity"
  {...field}
  placeholder="Enter product name"
  className="p-4 w-40"
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

export default UpdateCartForm;
