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
import { addAddressApi, getAddressApi, getCartApi } from "@/features/api/apicall";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Payment from "./Payment";
import AddressCard from "./AddressCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const ProceedToBuy = ({ redirect }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie] = useCookies(["auth"]);
  const queryClient = useQueryClient();
  // const token = useSelector(selectUserCurrentToken);
  const [showProducts, setShowProducts]:any = useState([]);
  const [showAddress, setShowAddress]:any = useState([]);
  const [showAddressForm, setShowAddressForm]:any = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartData } = useSelector((state: any) => state.cart);
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      billToName: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      eir: ''
    },
  });
const addAddress = async(data:any) => {
  try {
    // const formData = new FormData();
    // formData.append("address1", data.address1); // corrected field name
    // formData.append("address2", data.address2); // corrected field name
    // formData.append("billToName", data.billToName); // corrected field name
    // formData.append("city", data.city);
    // formData.append("county", data.county); // corrected field name
    // formData.append("eir", data.eir); // corrected field name
    
    
    

    const config = {
        headers: {
            Authorization: `Bearer ${cookie.auth}`,
          
        }
    };

    const res = await addAddressApi   (data, config);
    console.log(res, 'addedsubmitData');
   setShowAddressForm(false)
    
    

} catch (error) {
    console.error("Error fetching product data:", error);
}

};
  
  function cancelButton(){
    setShowAddressForm(false)
  }
  async function fetchAddressData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
       
      };
      
      const res = await getAddressApi(payload);
      console.log(res, 'getaddress')
      return res?.data
      // setShowAddress(res?.data);
      
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  // useEffect(() => {
  //   fetchCategoryData();
    
  // }, []);
  // const loginClickHanlder = () => {
  //   navigate('/user/payment');
    
  // };
  const { isFetching,  data: AddressData } = useQuery({
    queryKey: ["addressData"],
    queryFn: fetchAddressData ,
  });
  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["addressData"] });

   
  };
  const onRequestError = () => {
    toast("Error");
  };
  const updateMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });
  const submitData = async (data: any) => {
    console.log(data)
  
      // const formData = new FormData();
      // formData.append("address1", data.address1); // corrected field name
      // formData.append("address2", data.address2); // corrected field name
      // formData.append("billToName", data.billToName); // corrected field name
      // formData.append("city", data.city);
      // formData.append("county", data.county); // corrected field name
      // formData.append("eir", data.eir); // corrected field name
      
      const FilteredData = {
        address1: data.address1,
        address2: data.address2,
        billToName: data.billToName,
        city: data.city,
        county: data.county,
        eir: data.eir
      };
      

    

      updateMutation.mutate({ ...FilteredData });
      
      



  };
  async function fetchCartProductsData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await getCartApi(payload);
      setShowProducts(res?.data?.cart?.CartItem || []);
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
  function addressFormClickHandler(){
    setShowAddressForm(true)
  }
  function clickHandler(){
    navigate('/user/cart')
  }
  return (
   <div> 
   <div className="text-3xl font-bold bg-[#f3f4f6] text-black w-full p-3 text-center">CheckOut</div>
    <div className=" flex gap-4 w-10/12 mx-auto ">
   <div className="w-[50%] min-h-[100px] border-2 border-purple-400 rounded-md flex flex-col items-center">
     <div className="my-10 w-full">
       <div className="w-full">
         <div className="w-full">
         <div className="text-2xl font-bold bg-[#f3f4f6] text-black w-full p-3 text-center -mt-10">Delivery Address</div>
               <Button variant={"purple"} onClick={addressFormClickHandler} className="float-right relative -top-12 mr-2">Add New Address</Button>
         {AddressData?.length > 0 && (<div className=" p-6 rounded-lg shadow-md">
           <div className="flex justify-between items-center mb-4">
             
             <div>
             </div>
           </div>
           <div className="flex gap-5">
{ AddressData?.map((address:any, index:any) => (
 <div key={index} className="flex gap-5 items-center bg-gray-100 p-4 rounded-lg shadow-md">
 <div>
   <input
     type="radio"
     name="selectedAddress"
     value={index}
     onChange={() => handleAddressSelection(address)}
     className="form-radio text-indigo-600 h-5 w-5"
   />
 </div>
 <div>
   <div className="mb-2 font-semibold  text-gray-800">{address.billToName}</div>
   <div className="mb-2 font-semibold text-gray-700">{address.address1}</div>
   <div className="mb-2 font-semibold text-gray-700"> {address.address2}</div>
   <div className="mb-2 font-semibold text-gray-700">{address.city}</div>
   <div className="mb-2 font-semibold text-gray-700">{address.county}</div>
   <div className="mb-2 font-semibold text-gray-700">{address.eir}</div>
 </div>
</div>

))}
</div>

         </div>) } 
         {showAddressForm && ( 
        <div className="mt-10">
            <div className="text-2xl font-bold bg-[#f3f4f6] text-black w-full p-3 text-center -mt-10">Add Address</div>
           <div className="w-1/2 mx-auto">
             <Form {...form}>
             <form
               onSubmit={form.handleSubmit(submitData)}
               className="space-y-4"
             >
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
                 <div className="flex justify-center gap-5 mt-24">
                   <Button
                     type="submit"
                 
                     variant={'green'}
                   >
                     Save This Address
                   </Button>
                   <Button
                 onClick={cancelButton}
                 
                     variant={'red'}
                   >
                    Cancel
                   </Button>
                 </div>
               </div>
             </form>
           </Form>
         </div>
        </div>
       )}
         </div>
       </div>
     </div>
     
     <div className="text-2xl font-bold bg-[#f3f4f6] text-black w-full p-3 text-center ">Payment</div>
   
          <Payment selectedAddressId={selectedAddressId}/>
     
   </div>
   <div className="border-2 border-purple-400 rounded-lg w-1/2 p-4 h-[450px] shadow-md ">
<div>
 <div className="flex justify-between items-center mb-4 border-b-2 border-purple-400 p-2">
   <div className="font-semibold text-lg">{`${showProducts.length} Items`}</div>
   <div>
   <Button variant={'purple'} onClick={clickHandler}>
     Edit
   </Button>
   </div>
 </div>
 <div className="max-h-60 overflow-y-auto border-b-2 border-purple-400 p-2">
{showProducts.map((cd:any, index:any) => (
 <div className="flex items-center mb-4" key={index}>
   <div className="w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden">
     <img src={`data:image/jpeg;base64,${cd?.colorRelation?.image?.buffer}`} alt={cd.title} className="w-full h-full object-cover" />
   </div>
  
   <div className="ml-4">
   <div className="font-bold text-xl">{cd?.colorRelation?.Product?.name}</div>
     <div className="">{`Price : €${cd?.colorRelation?.Product?.price
}`}</div>
     <div className="text-sm">{cd.title}</div>
     <div className="text-sm text-gray-600">Quantity : {cd?.quantity}</div>
   </div>
 </div>
))}
</div>
<div className="mt-4">

<div className="flex justify-between  mt-10">
 <div className="font-bold text-xl">Total to Pay</div>
 <div className="font-bold text-xl">
   {/* Dynamically calculate total price */}
   €{showProducts.reduce((acc, cd) => acc + cd?.totalPrice, 0).toFixed(2)}
 </div>
</div>
</div>

</div>
</div>

 </div></div>
  );
};

export default ProceedToBuy;
