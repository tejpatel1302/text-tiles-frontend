import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate()

  function clickHandler(){
    navigate('/user/sub-category')
  }
  return (
    <div >
      <div className="text-4xl font-bold mt-10 mx-28  text-gray-600">Choose Your Category:</div>
      <div className="flex justify-center items-center gap-10 mt-10" onClick={clickHandler}>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1535530705774-695729778c55?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">Men's Stylish Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">Women's Stylish Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjBjaGlsZHJlbnxlbnwwfHwwfHx8MA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">Children Stylish Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default Category;
