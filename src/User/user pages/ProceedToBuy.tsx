import * as z from "zod";
import { LoginSchema } from "@/utils/schemas";
import CardWrapper from "@/components/common/Card-Wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

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
import Cart from "./Cart";

const ProceedToBuy = ({ redirect }: any) => {
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
      <div className="flex  w-10/12 mx-auto rounded-md bg-white justify-between p-12 my-4 max-h-screen">
        <div className="mx-auto w-6/12  border-2 border-black px-20 rounded-md max-h-screen ">
        <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger> <div className="text-3xl font-bold  max-h-screen">
          Address
        </div></AccordionTrigger>
    <AccordionContent>
    <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-36">Address:</FormLabel>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-36">Country:</FormLabel>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-36">Postcode:</FormLabel>
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
                <div className="flex justify-center gap-5 mt-24">
                  <Button
                    type="submit"
                    onClick={loginClickHanlder}
                    className="px-16 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                  >
                    Deliver To This Address
                  </Button>
                </div>
              </div>
            </form>
          </Form>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger><div className="text-3xl font-bold  max-h-screen">
    Payment Type
        </div></AccordionTrigger>
    <AccordionContent>
       <div>
        <div>Credit Card</div>
        <div>Debit Card</div>
        <div>PayPal</div>
      </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger><div className="text-3xl font-bold  max-h-screen">
    Payment 
        </div></AccordionTrigger>
        <AccordionContent>
    <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-36">Card Number:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your Card Number"
                          type="text"
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
                      <FormLabel className="w-36">Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your Expiry Date"
                          type="text"
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
                      <FormLabel className="w-36">Name on Card:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your Name on Card"
                          type="text"
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
                      <FormLabel className="w-36">CVV:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Enter your CVV"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center gap-5 mt-24">
                  <Button
                    type="submit"
                    onClick={loginClickHanlder}
                    className="px-16 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                  >
                    Use This Card
                  </Button>
                </div>
              </div>
            </form>
          </Form>
    </AccordionContent>
  </AccordionItem>
 
</Accordion>
       
          
        </div>
        <div className="max-h-[550px] w-[45%] overflow-scroll border-2 border-gray-500 rounded-md">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ProceedToBuy;
