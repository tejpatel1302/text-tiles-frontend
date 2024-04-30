import { OrderReportc, columns } from "@/utils/order-report-column";
import { DataTable } from "@/components/common/Data-table";

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

  // Calculate the total amount from all orders
  const totalMoney = showOrder.reduce((total, order) => total + parseInt(order.totalAmount), 0);


  // Create final data object with total orders and total money
  const finalData = [
    {
      totalOrders: totalOrders,
      totalMoney: totalMoney
    }
  ];

  // Map the data to match the expected structure for DataTable
  const data: OrderReportc[] = finalData.map((order: any) => ({
    ordertotal: order.totalOrders,
    totalmoney: order.totalMoney
  }));

  return (
    <div className="overflow-x-hidden">
       <div className="my-10 ml-2 text-3xl font-bold">Orders-Report</div>
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
