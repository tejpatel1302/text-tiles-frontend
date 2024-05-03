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
import { AddProduct, CardSchema, UpdateProduct } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { updatePaymentCardApi, updateProductApi } from "@/features/api/apicall";

const UpdatePaymentForm = ({ isOpen, onOpenChange, payment }: any) => {
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      cardType: "",
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "all",
  });
  //   function handleProductUpdate(){

  //   }
  const handleProductUpdate = async (paymentData: any) => {
    try {
      const req = {
        cardType: paymentData.cardType,
        cardNumber: paymentData.cardNumber,
        cardHolderName: paymentData.cardHolderName,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
        // Add other fields here
      };

      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await updatePaymentCardApi(payload, paymentData?.id, req);
      toast.success("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };
  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["paymentData"] });

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
    if (payment) {
      form.reset({
        cardType: payment.cardType,
        cardNumber: payment.cardNumber,
        cardHolderName: payment.cardHolderName,
        expiryDate: payment.expiryDate,
        cvv: payment.cvv,
      });
    } else {
      form.reset();
    }
  }, [isOpen, payment]);
  const onSubmit: any = (values: any) => {
    console.log(values);
    const req = {
      cardType: values.cardType,
      cardNumber: values.cardNumber,
      cardHolderName: values.cardHolderName,
      expiryDate: values.expiryDate,
      cvv: values.cvv,
      // Add other fields here
    };

    updateMutation.mutate({ ...req, id: payment.id });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>
              Make changes to your payment method here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardType"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="name" className="w-24">cardType:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="name"
                            placeholder="Enterpayment name"
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
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="description" className="w-24">cardNumber:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="description"
                            placeholder="Enterpayment cardNumber"
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
                  name="cardHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center ">
                        <FormLabel htmlFor="price" className="w-24">cardHolder:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="price"
                            placeholder="Enterpayment cardHolderName"
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
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="size" className="w-24">expiryDate:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="size"
                            {...field}
                            placeholder="Enterpayment expiryDate"
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
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="material" className="w-24">cvv:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="material"
                            placeholder="Enterpayment cvv"
                            {...field}
                            className="p-4 w-60"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="relative left-[105px]" />
                    </FormItem>
                  )}
                />

              <div className="w-full flex justify-center">
              <Button
                  variant={"green"}
                  // disabled={!form.formState.isValid}
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-20 px-24 py-2"
                >
                  Save
                </Button>
              </div>
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

export default UpdatePaymentForm;
