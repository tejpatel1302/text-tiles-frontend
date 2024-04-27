import * as z from "zod";
import { AddressSchema, CardSchema, LoginSchema } from "@/utils/schemas";
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
import { useEffect, useState } from "react";
import { OrderApi, PaymentApi, getAddressApi, getCartApi } from "@/features/api/apicall";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useCookies } from "react-cookie";
import { Toaster, toast } from 'sonner'

const Payment = ({ redirect }: any) => {
  const [displayPayment, setDisplayPayment] = useState(false);
  const dispatch = useDispatch();
  // const token = useSelector(selectUserCurrentToken)
  const [cookie] = useCookies(["auth"]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts]:any = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const { addressData } = useSelector((state: any) => state.address);
  const { cartData } = useSelector((state: any) => state.cart);
  const [showAddress, setShowAddress]:any = useState([]);
  const [cartId, setCartId]:any = useState([]);
  const [paymentData, setPaymentData]:any = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const form = useForm<z.infer<typeof  CardSchema >>({
    resolver: zodResolver( CardSchema ),
    defaultValues: {
      cardType: '',
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
     
    },
  });
  const submitData = async (data: any) => {
    try {
      const FilteredData = {
        cardType: selectedCard,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        expiryDate: data. expiryDate,
        cvv: data. cvv,
      };
  
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        }
      };
  
      const res = await PaymentApi(FilteredData, config);
      console.log(res,'ppaaaaaappp')
      setPaymentData(res)
      console.log(res, 'addedsubmitData');
      navigate('/user/payment');
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error appropriately, like showing a user-friendly message
    }
  };
  const OrderData = async () => {
    try {
      const FilteredData2 = {
        cartId: cartId,
        amount: totalPrice,
        paymentCardId: paymentData?.id,
        addressId: selectedAddressId
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        }
      };
  
      const res = await OrderApi(FilteredData2, config);
      console.log(res, 'addedordertddsf ,fsdData');
      toast.success('The order has been successfully made');
      navigate('/user/payment');
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.success('The order has been sent');
      // Handle error appropriately, like showing a user-friendly message
    }
  };
  useEffect(() => {
    OrderData();
    
  }, [paymentData]);
  

  const clickHandler = (cardtype:any) =>{
    setDisplayPayment(true)
    setSelectedCard(cardtype);
  }
  async function fetchCategoryData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getAddressApi(payload);
      console.log(res, 'getaddress')
      setShowAddress(res?.data);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  useEffect(() => {
    fetchCategoryData();
    
  }, []);
  useEffect(() => {
    // Calculate total price whenever showProducts changes
    const calculatedTotalPrice = showProducts.reduce((acc, cd) => acc + cd.totalPrice, 0);
    setTotalPrice(calculatedTotalPrice);
  }, [showProducts]);
  async function fetchCartProductsData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await getCartApi(payload);
      console.log(res,'cartdaat')
      setShowProducts(res?.data?.cart?.CartItem || []);
      setCartId(res?.data?.cart?.id)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
console.log(showProducts,'jijiji')
  useEffect(() => {
    fetchCartProductsData();
  }, [cookie.auth]);

  const handleAddressSelection = (address: any) => {
    setSelectedAddressId(address.id);
    console.log(address.id, 'selected address id'); // Accessing address.id here
  };
  return (
    <div className=" flex w-8/12 gap-4 mx-auto my-10">
       <Toaster position="top-center" />
      <div className="w-1/2">
        <Card2 headerLabel="Payment">
          <div>
           { !displayPayment && (<>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold">Billing Address</div>
                <div>
                  <Button variant={"purple"}>Change</Button>
                </div>
              </div>
              <div>
  {showAddress.map((address:any, index:any) => (
    <div key={index} className="flex">
      <div>
      <input
  type="radio"
  name="selectedAddress"
  value={index}
  onChange={() => handleAddressSelection(address)}
/>
      </div>
      <div className="mb-2">{address.billToName}</div>
      <div className="mb-2">{address.address1}</div>
      <div className="mb-2">{address.address2}</div>
      <div className="mb-2">{address.city}</div>
      <div className="mb-2">{address.county}</div>
      <div className="mb-2">{address.eir}</div>
    </div>
  ))}
</div>

            </div>
            <div>
              <div className="text-2xl font-bold my-4">Payment Type:</div>
              <div>
                <div className="border-2 border-black rounded-lg p-6 text-center" onClick={() => clickHandler('Credit Card')}>
                  Credit Card
                </div>
                <div className="text-center">OR</div>
                <div className="border-2 border-black rounded-lg p-6 text-center"  onClick={() => clickHandler('Debit Card')}>
                  Debit Card
                </div>
              </div>
            </div>
           </>)}
            {displayPayment && <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submitData)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
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
                      name="expiryDate"
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
                      name="cardHolderName"
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
                      name="cvv"
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
                        
                        variant={"purple"}
                      >
                        Use This Card
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>}
          </div>
        </Card2>
      </div>
      <div className="border-2 border-purple-400 rounded-lg w-1/2 p-4 h-[450px] shadow-md ">
        <div>
          <div className="flex justify-between items-center mb-4 border-b-2 border-purple-400 p-2">
            <div className="font-semibold text-lg">{`$${showProducts.length} Items`}</div>
            <div>
              <Button variant={"purple"}>Edit</Button>
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto border-b-2 border-purple-400 p-2">
            {showProducts.map((cd: any, index: any) => (
              <div className="flex items-center mb-4" key={index}>
                <div className="w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img src={`data:image/jpeg;base64,${cd?.colorRelation?.image?.buffer}`} alt={cd.title} className="w-full h-full object-cover" />

                </div>
                <div className="ml-4">
                <div className="font-bold text-xl">{`${cd?.totalPrice.toFixed(2)} \u20AC`}</div>

        <div className="text-sm">{cd.title}</div>
        <div className="text-sm text-gray-600">Quantity: 1</div>
      </div>
              </div>
            ))}
          </div>
          <div className="mt-4">

  <div className="flex justify-between mt-10">
    <div className="font-bold text-xl ">Total to Pay</div>
    <div className="font-bold text-xl">{`${(totalPrice ).toFixed(2)} \u20AC`}</div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
