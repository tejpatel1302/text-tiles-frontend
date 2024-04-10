import { category} from "@/utils/category";
import { DataTable } from "@/components/common/Data-table";
import { Category, columns } from "@/utils/category-column";

const ManageCategory= () => {
  const data: Category[] = category.map((item:any) => ({
    categoryID: item.categoryID,
    categoryName: item.categoryName,
    categoryDescription: item.categoryDescription
     
    
  }));



  return (
    <div className="bg-white">
      <div className=" m-10 my-10 text-3xl font-bold">Order Details:</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ManageCategory;
