import { useNavigate } from "react-router-dom";

const SubCategory = () => {
  const navigate = useNavigate()

  function clickHandler(){
    navigate('/user/products')
  }
  return (
    <div className="w-11/12 mx-auto">
     <div className="text-4xl font-bold mt-10 text-gray-600">Choose Your Sub-Category:</div>

      <div className="flex justify-center items-center gap-10 mt-10" onClick={clickHandler}>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1617113930975-f9c7243ae527?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">Suit Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">Sweat-Shirt Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1507253831417-37c43a944f51?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">T-Shirt Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      <div className="h-[500px] w-[400px] rounded-lg border border-gray-300  bg-white overflow-hidden shadow-lg relative transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center">
        <img className="h-96" src="https://images.unsplash.com/photo-1615093826418-b7d67b17b505?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="men's wear" />
       
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mt-10">T-Shirt Wear</div>
         
        </div>
       
        <div className="px-6 py-4 flex items-center justify-between">
        
         
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default SubCategory;
