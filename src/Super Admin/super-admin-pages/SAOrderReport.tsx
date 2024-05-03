import { OrderReportc, columns } from "@/utils/order-report-column";
import { DataTable } from "@/components/common/Data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderReport } from "@/utils/order-report"; 
import { getOrdersApi, getOrdersErpApi } from "@/features/api/apicall";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { selectSACurrentToken } from "@/features/redux_toolkit/saSlice";
import { useCookies } from "react-cookie";

const SAOrderReport = () => {
  const [cookie] = useCookies(["auth"]);
  const [position, setPosition]:any = useState("")
  const [showOrder, setShowOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await getOrdersErpApi(payload);
      console.log(res, 'orderserppp')
      setShowOrder(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, []);

  const totalOrders = showOrder.length;
  const status = showOrder?.map((order) => ({
    status: order?.status === `${position}` ? `${order?.totalAmount}` : '' 
  }));
console.log(status,'status.....')
  const rejectedOrders = status.filter((order) => order.status!== '');
  const totalRefundAmount = rejectedOrders.reduce((acc, order) => acc + parseFloat(order.status.split(' ')[0]), 0);
console.log(totalRefundAmount, 'finally')
  const totalMoney = showOrder.reduce((total, order) => total + parseInt(order.totalAmount), 0);
  const status1 = showOrder?.map((order) => ({
    status: order?.status === `${position}` ? `${order?.totalAmount}` : '' 
  }));
const selectedStatus = status1.length
  

  // Create final data object with total orders and total money
  const finalData = [
    {
      totalOrders: `${position ? selectedStatus : totalOrders}`,
      totalMoney: `${position ? totalRefundAmount : totalMoney}`,
    }
  ];
  function convertDateFormat(dateString: any) {
    if (!dateString) return "";
    const datePart = dateString.split("T")[0];
    return datePart;
  }
  // Map the data to match the expected structure for DataTable
  const data: OrderReportc[] = finalData.map((order: any) => ({
    ordertotal: order.totalOrders,
    totalmoney: order.totalMoney,
    orderDate: convertDateFormat(order?.orderDate),
  }));

  return (
    <div className="overflow-x-hidden">
       <div className="my-10 ml-2 text-3xl font-bold">Orders-Report</div>
    
      <div className="absolute left-[1200px] top-[250px]">
        <DropdownMenu>
          
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer border-2 border-black w-full rounded-lg p-4 ">Status</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="REVIEWED">REVIEWED</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PRODUCTION" >PRODUCTION</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="COMPLETED">COMPLETED</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
       {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default SAOrderReport;
