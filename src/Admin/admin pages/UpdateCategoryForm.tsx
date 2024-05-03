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
import {  UpdateCategorySchema, UpdateProduct } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { updateCategoryApi } from "@/features/api/apicall";


const UpdateCategoryForm = ({ isOpen, onOpenChange, category }: any) => {
    console.log(category,'plezcata')
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: "",
       file:"",
    },
    mode: "all",
  });
  //   function handleProductUpdate(){

  //   }
  const handleCategoryUpdate = async (req:any) => {
        try {
          const formData = new FormData();
          if (req?.file) {
            formData.append("file", req?.file[0]);
          }
          formData.append("name", req?.name);
    
          const payload = {
            Authorization: `Bearer ${cookie.auth}`,
            "Content-Type": "multipart/form-data",
          };
    
          const res = await updateCategoryApi(
            payload,
            req?.id,
            formData
          );
         
    
          toast.success("Category updated successfully");
        } catch (error) {
          console.error("Error updating category:", error);
          toast.error("Error updating category. Please try again later.");
        }
      };
  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["categoryData"] });

    onOpenChange(false);
  };
  const onRequestError = () => {
    toast("Error");
  };
  const updateMutation = useMutation({
    mutationFn: handleCategoryUpdate,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });
  useEffect(() => {
    if (category ) {
        form.reset({
            name: category?.name,
            file: category?.file
          });
    } else {
      form.reset();
    }
  }, [isOpen, category ]);
  const onSubmit: any = (values: any) => {
    console.log(values)
    const req = {
      name: values?.name,
      file: values?.file
      // Add other fields here
    };

    updateMutation.mutate({ ...req, id: category?.categoryID });
  };
  const fileRef = form.register('file', { required: true });
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to your category here. Click save when you're done.
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
                        <FormLabel className="w-20">Name:</FormLabel>
                        <FormControl>
                        <Input
                        type="text"
                        {...field}

                        className="p-4 w-60"
                      />
                        </FormControl>
                      </div>
                      <FormMessage className="relative left-[105px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="w-20">Image:</FormLabel>
                        <FormControl>
                        <Input
                          type="file"
                          {...fileRef}
                          className="my-4 w-60"
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

export default UpdateCategoryForm;
