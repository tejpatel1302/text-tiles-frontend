import * as z from "zod";
import { AddressSchema, LoginSchema } from "@/utils/schemas";
import CardWrapper from "@/components/common/Card-Wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { LockIcon, Mail, UserRound } from "lucide-react";
import Card2 from "./Card2";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "@/features/redux_toolkit/addressSlice";


const ProceedToBuy = ({ redirect }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { cartData } = useSelector((state: any) => state.cart);
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      county: '',
      postcode: ''
    },
  });

  const submitData = (data: any) => {
   
    dispatch(addAddress(data));
    navigate('/user/payment'); 
    console.log(data)
  };

  const loginClickHanlder = () => {
    navigate(redirect);
    
  };

  return (
    <div className="h-screen flex w-8/12 gap-4 mx-auto my-10">
      <div className="w-1/2">
        <Card2 headerLabel="ADD ADDRESS">
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
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="w-36">First Name:</FormLabel>
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
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="w-36">Last Name:</FormLabel>
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
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
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
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
                        variant={'purple'}
                      >
                        Save This Address
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Card2>
      </div>
      <div className="border-2 border-purple-400 rounded-lg w-1/2 p-4 h-[450px] shadow-md ">
  <div>
    <div className="flex justify-between items-center mb-4 border-b-2 border-purple-400 p-2">
      <div className="font-semibold text-lg">{`${cartData.length} Items`}</div>
      <div>
      <Button variant={'purple'}>
        Edit
      </Button>
      </div>
    </div>
    <div className="max-h-60 overflow-y-auto border-b-2 border-purple-400 p-2">
      {cartData.map((cd:any, index:any) => (
        <div className="flex items-center mb-4" key={index}>
          <div className="w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden">
            <img src={cd.image} alt={cd.title} className="w-full h-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="font-bold text-xl">{`$${cd.price}`}</div>
            <div className="text-sm">{cd.title}</div>
            <div className="text-sm text-gray-600">Quantity: 1</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <div className="font-semibold">Delivery Charges</div>
        <div className="font-semibold">$5.00</div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-xl">Total to Pay</div>
        <div className="font-bold text-xl">$100.00</div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProceedToBuy;
