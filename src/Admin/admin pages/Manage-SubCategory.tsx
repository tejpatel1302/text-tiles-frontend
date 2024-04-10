import { subcategory } from "@/utils/sub-category";
import { DataTable } from "@/components/common/Data-table";
import { SubCategory, columns } from "@/utils/sub-category-column";

const ManageSubCategory = () => {
  const data: SubCategory[] = subcategory.map((item: any) => ({
    subcategoryID: item.subcategoryID,
    subcategoryName: item.subcategoryName,
    subcategoryDescription: item.subcategoryDescription,
    mainCategoryName: item.mainCategoryName


  }));



  return (
    <div className="bg-white">
      <div className=" m-10 my-10 text-3xl font-bold">Manage Sub-Category</div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ManageSubCategory;
