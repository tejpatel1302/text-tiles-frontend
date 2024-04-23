import { OrderReportc, columns } from "@/utils/order-report-column";
import { DataTable } from "@/components/common/Data-table";

import { OrderReport } from "@/utils/order-report"; 

const UserOrderReport = () => {
  const data: OrderReportc[] = OrderReport.map((order:any) => ({
    ordertotal: order.ordertotal,
    totalmoney: order.totalmoney
  }));



  return (
    <div >
       <div className="mt-4 text-3xl font-bold">Orders-Report</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserOrderReport;
