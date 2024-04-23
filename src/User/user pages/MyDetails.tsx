import Card2 from '@/User/user pages/Card2'
import React from 'react'

const MyDetails = () => {
  return (
    <div className='max-h-screen mx-auto w-10/12'>
     
            <div>
              <div className="text-3xl font-bold mr-[630px] my-4">My Details</div>
            </div>
          
            <div className="flex flex-col justify-center">
  <div className="max-w-[90%] rounded-lg overflow-hidden shadow-lg bg-white my-4">
    <div className="px-6 py-4">
      <div className="border-2 border-purple-400 h-32 flex items-center justify-center rounded-lg"></div>
    </div>
  </div>
  <div className="max-w-[90%] rounded-lg overflow-hidden shadow-lg bg-white my-4">
    <div className="px-6 py-4">
      <div className="border-2 border-purple-400  h-64 flex items-center justify-center"></div>
    </div>
  </div>
</div>

        <div></div>
    </div>
  )
}

export default MyDetails