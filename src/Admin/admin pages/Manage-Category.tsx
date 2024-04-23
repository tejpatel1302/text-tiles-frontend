
import { DataTable } from "@/components/common/Data-table";
import { useAddCategoryMutation } from "@/features/api/productsApiSLice";
import { category } from "@/utils/category";
import { Category, columns } from "@/utils/category-column";

const ManageCategory = () => {
  // const{data: category}= useAddCategoryMutation()
  const data1: Category[] = category.map((item) => ({
    categoryID: item.categoryID,
    categoryName: item.categoryName,
    categoryDescription: item.categoryDescription,
    image: item.image,
  }));

  return (
    <div className="bg-white">
      <div className="text-3xl font-bold">Category Management:</div>
      <div>
        <DataTable columns={columns} data={data1} />
      </div>
    </div>
  );
};

export default ManageCategory;
