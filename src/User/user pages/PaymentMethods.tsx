import { PaymentMethods,columns, getPaymentColumns } from "@/utils/payment-methods-column ";
import { DataTable } from "@/components/common/Data-table";
import { products } from "@/utils/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { deletePaymentMethodsApi,  getPaymentApi, getProductsApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { useCookies } from "react-cookie";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import { Toaster, toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UpdatePaymentForm from "./UpdatePaymentForm";


const ManagePaymentMethods = () => {
  // const token = useSelector(selectAdminCurrentToken);
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedPayment, setSelectedPayment]:any = useState(null)
  const queryClient = useQueryClient();

  
  
  
 
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getPaymentApi(headers);
        return res.data;
       
      
      } catch (error) {
        console.error("Error fetching user data:", error);
    
      }
    };
    const { isFetching,  data: PaymentData } = useQuery({
      queryKey: ["paymentData"],
      queryFn: fetchUserData,
    });

    


  
  
  const data: PaymentMethods[] = PaymentData ?.map((data:any) => ({
    id: data?.id,
    cardType: data?.cardType,
    cardNumber: data?.cardNumber,
    cardHolderName: data?.CardHolder,
    expiryDate: data?.expiryDate,
    cvv: data?.cvv,
    
    
    
    
    
  }));
  const handleRemoveAddress = async (id:any) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await deletePaymentMethodsApi(payload, id);
   
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }
  };
  const deleteMutation = useMutation({
    mutationFn: handleRemoveAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey:  ["paymentData"] });
    },
  });
  const onDelete = useCallback((payment: any) => {
    deleteMutation.mutate(payment.id, {
      onSuccess: () => {
        toast('success');
      },
      onError: () => {
        toast('error');
      },
    });
  }, []);
  const onEdit = useCallback((payment: any) => {
    setSelectedPayment(payment)
    setIsDialogOpen(true)
    
  }, []);

  const columns = useMemo(() => getPaymentColumns({ onEdit, onDelete }), [
    onDelete,
    onEdit,
  ]);  
  return (
    <TableCard className="h-full">
            <Toaster/>
      <CardHeader>
        <CardTitle>Bank Accounts</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <UpdatePaymentForm
              isOpen={isDialogOpen}
              payment={selectedPayment}
              onOpenChange={(value:any) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedPayment(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </CardContent>
    </TableCard>
  );
};

export default ManagePaymentMethods;
