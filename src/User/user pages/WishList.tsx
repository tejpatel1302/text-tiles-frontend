
import { DataTable } from "@/components/common/Data-table";
import { WishListData } from "@/utils/wishlist-data";
import { WishList, columns } from "@/utils/wishlist-column";



const UserWishList = () => {
  const data: WishList[] = WishListData.map((product) => ({
      productId: product.productId,
    
      name: product.name,
      price : product.price,
      category : product.category,
      image: product.image,
      

    
   
   

  }));



  return (
    <div className="w-[95%] mx-auto">
       <div className=" text-3xl font-bold">Products:</div>
      <div className="flex flex-col justify-center w-[95%] mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserWishList;
