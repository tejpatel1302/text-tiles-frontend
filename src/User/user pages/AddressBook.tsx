import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card2 from '@/User/user pages/Card2';
import { getAddressApi, getUserApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';
import { useCookies } from "react-cookie";

const AddressBook = () => {
  const [user, setUser] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true);
  // const token = useSelector(selectUserCurrentToken);
  const [cookie] = useCookies(["auth"]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getAddressApi(headers);
        setUser(res?.data);
        console.log(res, 'getUser');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        // Handle error
      }
    };
    
    fetchUserData();
  }, [token]); // Added token as dependency
  console.log(user,'hi payment')
  return (
    <div className='max-h-screen mx-auto w-10/12'>
      <div>
        <div className="text-3xl font-bold mr-[630px] my-4">Payment Methods</div>
      </div>
      
      <div className="flex flex-col justify-center">
        {user?.map((paymentMethod, index) => (
          <div key={index} className="max-w-[90%] rounded-lg overflow-hidden shadow-lg bg-white my-4">
            <div className="px-6 py-4">
              <div className="border-2 border-purple-400 h-32 flex items-center justify-center rounded-lg">
                
                {/* Additional address details */}
                <div>Address 1: {paymentMethod.address1}</div>
                <div>Address 2: {paymentMethod.address2}</div>
                <div>Bill To Name: {paymentMethod.billToName}</div>
                <div>City: {paymentMethod.city}</div>
                <div>County: {paymentMethod.county}</div>
                <div>Eir: {paymentMethod.eir}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
