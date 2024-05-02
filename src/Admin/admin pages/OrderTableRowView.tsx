import { Button } from '@/components/ui/button';
import { OrderDetails } from '@/utils/Order-details';
import { Row } from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminOrderDetails from './Order-Details';



interface OrderTableRowViewProps<TData> {
  row: Row<TData>;
  
}

const OrderTableRowView = <TData,>({ row }: OrderTableRowViewProps<TData>) => {
    const location = useLocation();
    const navigate = useNavigate()
    const isAdminOrders = location.pathname === "/admin/orders";
    const isSuperAdminOrders = location.pathname === "/super-admin/orders";
    const isUser = location.pathname === "/user/order-history";
    function clickHandler(id:any){
       if( isAdminOrders){
        navigate(`/admin/order-details/${id}`)
       }else if(isUser){
        navigate(`/user/order-details/${id}`)
       }else if(isSuperAdminOrders){
        navigate(`/super-admin/order-details/${id}`)
       }
    }
  return (
   <div>
   {  (isAdminOrders || isUser || isSuperAdminOrders) &&   (<Button onClick={()=>{clickHandler(row.original.id)}} variant={
      isUser
        ? "purple"
        : isAdminOrders
        ? "skyblue"
        : isSuperAdminOrders
        ? "red"
        : "default"
    }>
   View
    </Button>)}
   </div>
  );
};

export default OrderTableRowView;

