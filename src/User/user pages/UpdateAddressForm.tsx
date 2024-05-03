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
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { updateAddressApi } from "@/features/api/apicall";
import { Loader2 } from "lucide-react";

const UpdateAddressForm = ({ isOpen, onOpenChange, address }: any) => {
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      billToName: "",
      address1: "",
      address2: "",
      city: "",
      county: "",
      eir: "",
    },
  });
  //   function handleProductUpdate(){

  //   }
  const handleAddressUpdate = async (req: any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await updateAddressApi(payload, req.id, req);

      toast.success("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };
  const onUpdateSuccess = async (updatedAddress: any) => {
    await queryClient.invalidateQueries({ queryKey: ["addressData"] });

    onOpenChange(false);
  };
  const onRequestError = () => {
    toast("Error");
  };
  const updateMutation = useMutation({
    mutationFn: handleAddressUpdate,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });
  useEffect(() => {
    if (address) {
      form.reset({
        address1: address.address1,
        address2: address.address2,
        billToName: address.billToName,
        city: address.city,
        county: address.county,
        eir: address.eir,
      });
    } else {
      form.reset();
    }
  }, [isOpen, address]);
  const onSubmit: any = (values: any) => {
    const req = {
      address1: values.address1,
      address2: values.address2,
      billToName: values.billToName,
      city: values.city,
      county: values.county,
      eir: values.eir,
      // Add other fields here
    };

    updateMutation.mutate({ ...req, id: address.id });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Make changes to your address here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="billToName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">Billing Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your First Name"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">Address 1:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your Last Name"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">Address 2:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your address"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">City:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your city"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">County:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your country"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-36">EIR:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your postcode"
                          type="text"
                        />
                      </FormControl>
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

export default UpdateAddressForm;
