import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { getOrdersErpApi } from "@/features/api/apicall";
import { DataTable } from "@/components/common/Data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderReportc, columns } from "@/utils/order-report-column";
import { Button } from "@/components/ui/button";

const SAOrderReport = () => {
  const [cookie] = useCookies(["auth"]);
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [showOrder, setShowOrder] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  async function fetchOrderData() {
    try {
      const payload = {
        Authorization: "Bearer " + cookie.auth,
      };

      const res = await getOrdersErpApi(payload);
      
      setShowOrder(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
      // Handle error here, e.g., display an error message to the user
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, [position]);

  useEffect(() => {
    const sortedByStatus = position ? [...showOrder].filter(order => order.status === position) : [...showOrder];
    setFilteredOrders(sortedByStatus);
  }, [position, showOrder]);

  const applyDateRange = () => {
    console.log(startDate, endDate, "date");
    if (startDate && endDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);
      const filtered = filteredOrders.filter((order: any) => {
        const orderDate = new Date(order.orderDate).getTime();
        return orderDate >= start && orderDate <= end;
      });
      setFilteredOrders(filtered);
      setTotalOrders(filtered.length);
      const totalMoneyAmount = filtered.reduce((total: number, order: any) => total + parseFloat(order.totalAmount), 0);
      setTotalMoney(totalMoneyAmount);
    } else {
      setFilteredOrders([]);
      setTotalOrders(0);
      setTotalMoney(0);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="my-10 ml-2 text-3xl font-bold">Orders-Report</div>

      <div className="absolute left-[305px] top-[280px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer mr-2 border-2 border-black p-2 rounded-md">Status</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={(value) => setPosition(value)}>
              <DropdownMenuRadioItem value="REVIEWED">REVIEWED</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PRODUCTION">PRODUCTION</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="COMPLETED">COMPLETED</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4 flex">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="mr-2 border-2 border-black p-2 rounded-md"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date as Date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="mr-2 border-2 border-black p-2 rounded-md"
        />
        <Button onClick={applyDateRange}  variant={'red'}>
          Apply
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="text-3xl font-semibold my-28 mx-2" >Total Orders: {totalOrders}</div>
          <div className="text-3xl font-semibold my-20 mx-2">Total Money: {totalMoney.toFixed(2)}</div>
       
        </div>
      )}
    </div>
  );
};

export default SAOrderReport;