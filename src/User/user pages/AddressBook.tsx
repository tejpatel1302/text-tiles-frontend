import { Address,columns } from "@/utils/address-column";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddressApi, getProductsApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";


const AddressBook = () => {
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);
  
  const [showAddresses, setShowAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getAddressApi(headers);
        setShowAddresses(res?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [cookie.auth]);
console.log(showAddresses)
  
  
  const data: Address[] = showAddresses?.map((data:any) => ({
    id: data?.id,
    address1: data?.address1,
    address2: data?.address2,
    billToName: data?.billToName,
    city: data?.city,
    county: data?.county,
    eir: data?.eir,
    
    
    
    
    
  }));
  return (
    <div >
       <div className="my-8 ml-4 text-3xl font-bold"> Manage Address Book</div>
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

export default AddressBook;
