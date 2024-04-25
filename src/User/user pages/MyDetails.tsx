import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card2 from '@/User/user pages/Card2';
import { getUserApi } from '@/features/api/apicall';
import { selectUserCurrentToken } from '@/features/redux_toolkit/userAuthSlice';

const MyDetails = () => {
  const [user, setUser] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectUserCurrentToken);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await getUserApi(headers);
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
  
  return (
    <div className='max-h-screen mx-auto w-10/12'>
      <div>
        <div className="text-3xl font-bold mr-[630px] my-4">Address Book</div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="max-w-[90%] rounded-lg overflow-hidden shadow-lg bg-white my-4">
          <div className="px-6 py-4">
            <div className="border-2 border-purple-400 h-32 flex items-center justify-center rounded-lg">
              <div>{user?.user?.firstName}</div>
              <div>{user?.user?.lastName}</div>
              <div>{user?.user?.dob
}</div>
<div>{user?.user?.email}</div>
<div>{user?.user?.gender}</div>
<div>{user?.user?.phoneNum
}</div>
            </div>
          </div>
        </div>
        <div className="max-w-[90%] rounded-lg overflow-hidden shadow-lg bg-white my-4">
          <div className="px-6 py-4">
            <div className="border-2 border-purple-400 h-64 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
