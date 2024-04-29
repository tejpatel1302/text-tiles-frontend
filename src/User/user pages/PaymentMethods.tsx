import { PaymentMethods,columns } from "@/utils/payment-methods-column ";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddressApi, getPaymentApi, getProductsApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";


const ManagePaymentMethods = () => {
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);
  
  const [showPaymentMethods, setShowPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getPaymentApi(headers);
        setShowPaymentMethods(res?.data || []);
        setLoading(false);
        // Initialize editMode for each user
      
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookie.auth]);

  
  
  const data: PaymentMethods[] = showPaymentMethods?.map((data:any) => ({
    id: data?.id,
    cardType: data?.cardType,
    cardNumber: data?.cardNumber,
    cardHolderName: data?.CardHolder,
    expiryDate: data?.expiryDate,
    cvv: data?.cvv,
    
    
    
    
    
  }));
  return (
    <div >
       <div className="my-8 ml-4  text-3xl font-bold"> Manage Payment Methods</div>
       {loading ? (
        <div>Loading...</div>
      ) : (
        <div >
        <DataTable columns={columns} data={data} />
      </div>
      )}
    </div>
  );
};

export default ManagePaymentMethods;
