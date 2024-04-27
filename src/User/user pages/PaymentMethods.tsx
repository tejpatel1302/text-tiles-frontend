import Card2 from '@/User/user pages/Card2';
import { getPaymentApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";

const PaymentMethods = () => {
  const [user, setUser] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["auth"]);
  // const token = useSelector(selectUserCurrentToken);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getPaymentApi(headers);
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
  }, [token]); 

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
                {/* Render payment method details */}
                <div>Card Holder: {paymentMethod.cardHolder}</div>
                <div>Card Number: {paymentMethod.cardNumber}</div>
                <div>CVV: {paymentMethod.cvv}</div>
                <div>Expiry Date: {paymentMethod.expiryDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
