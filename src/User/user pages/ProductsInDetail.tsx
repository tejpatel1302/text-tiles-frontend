import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./Card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Accordian from "@/components/common/Accordian";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserWebsite from "./UserWebsite";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/features/redux_toolkit/cartSlice";

import {
  WishListApi,
  addToCartApi,
  getColorsApi,
  getProductsWithColorIdApi,
  getSingleProductApi,
  getUserApi,
} from "@/features/api/apicall";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { AddToCartSchema } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { selectUserCurrentToken } from "@/features/redux_toolkit/userAuthSlice";
import { useCookies } from "react-cookie";
import { addId } from "@/features/redux_toolkit/orderItemIdSlice";
import { Toaster, toast } from "sonner";

const ProductInDetail = () => {
  const dispatch = useDispatch();

  const [cookie] = useCookies(["auth"]);
  const form = useForm<z.infer<typeof AddToCartSchema>>({
    defaultValues: {
      productId: "",
      itemSize: "",
      colorRelationId: "",
      quantity: 1,
    },
    mode: "onChange",
    resolver: zodResolver(AddToCartSchema),
  });

  const [product, setProduct] = useState<any>(null);
  const [colorImage, setColorImage] = useState(product?.product?.colorRelation[0]?.image);

  const [colorId, setColorId] = useState(product?.product?.colorRelation[0]?.color?.id);
  const [wishlistColor, setwishlistColor] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const params = useParams();
  const { productId } = params;
  useEffect(() => {
    if (product && product.product && product.product.colorRelation && product.product.colorRelation.length > 0) {
      setColorImage(product.product.colorRelation[0]?.image);
      setColorId(product?.product?.colorRelation[0]?.color?.id)
    }
  }, [product]);
  useEffect(() => {
    async function fetchProductsData() {
      try {
        const payload = {
          Authorization: `Bearer ${cookie.auth}`,
          "Content-Type": "application/json",
        };

        const res = await getSingleProductApi(payload, productId);
        console.log(res, "proucts hhhhh");
        setProduct(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    }
   
    async function fetchUserData() {
      try {
        const payload = {
          Authorization: `Bearer ${cookie.auth}`,
          "Content-Type": "application/json",
        };
        const res = await getUserApi(payload);
        setUser(res?.data || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    
    // async function fetchColorsData() {
      //   try {
    //     const payload = {
    //       Authorization: `Bearer ${cookie.auth}`,
    //     };
    //     const res = await getColorsApi(payload);
    //     setShowColors(res?.data || []);
    //   } catch (error) {
    //     console.error("Error fetching colors data:", error);
    //   }
    // }

    // async function fetchColorsRelation() {
    //   try {
    //     const payload = {
    //       Authorization: `Bearer ${cookie.auth}`,
    //     };
    //     const res = await getProductsWithColorIdApi(payload, productId);
    //     setShowColorsRel(res || []);
    //   } catch (error) {
    //     console.error("Error fetching product colors data:", error);
    //   }
    // }

    if (productId) {
      fetchProductsData();
      fetchUserData();
      // fetchColorsData();
      // fetchColorsRelation();
    }
  }, [productId, cookie.auth]);

  const submitData = async (data: any) => {
    console.log('daad',data)
    try {
      const FilteredData = {
        productId: product?.product?.id,
        quantity: Number(data.quantity),
        itemSize: data.itemSize,
        colorRelationId: product?.product?.colorRelation[0]?.id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      };

      const res = await addToCartApi(FilteredData, config);
      toast.success('Item added to cart')
      console.log(res, "addedsubmitCartData");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const clickHandler = async (id: any) => {
    console.log(id, "wishlisid");
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const req = {
        productId: id,
      };
      const res = await WishListApi(payload, req);
      setwishlistColor(res?.data?.productId)
      dispatch(addId(res?.data?.id));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const clickHandler1 = (colorId: any, colorImage: any) => {
    setColorId(colorId);
    setColorImage(colorImage);
  };
  let sizes = product?.product?.size;
  let cleanedSizes = sizes && sizes.length > 0 ? sizes[0].replace(/"/g, '').split(',') : [];
 
  return (
    <div>
      <Toaster richColors/>
      <div className="flex justify-center items-center w-10/12 mx-auto py-8">
        {product && (
          <div className="flex gap-8">
            <div className="border border-gray-300 h-[450px] w-[400px] rounded-lg overflow-hidden flex justify-center items-center">
              <img
                src={`data:image/jpeg;base64,${colorImage?.buffer}`}
                alt={product?.title}
                className="h-96"
              />
             <div className="cursor-pointer relative -right-[20px] top-[145px]" >
             {/* <Heart
                className={`${wishlistColor === product?.product?.id ? 'text-red-500  ': 'text-gray-600'}  inline-block h-6 w-6  hover: `
                }
                onClick={() => clickHandler(product?.product?.id)}
              /> */}
              <div
          className="absolute -left-[70px] -top-[5px] h-12 w-12 right-0 rounded-full p-1 mr-2 bg-gray-300 hover:bg-gray-700 cursor-pointer"
          // onClick={toggleWishlist} 
        >
        <div id="heart-container" className='relative -left-[40px] -top-[38px]' onClick={() => clickHandler(product?.product?.id)}>
  <input type="checkbox" id="toggle">
  </input>
    <div id="twitter-heart"></div>
</div>
        </div>
             </div>
            </div>
            <div className="flex flex-col justify-center max-w-[500px]">
              <h2 className="text-3xl font-semibold mb-4 ">
                {product?.product?.name}
              </h2>
              <div className="text-xl mb-4 ">
               Price: € {product?.product?.price} 
              </div>
              <div className="mb-4">
                <div>
                  <div className="mb-2">Colors</div>
                  <div className="flex gap-3">
        {product?.product?.colorRelation?.map((color: any, index: number) => (
          <div
            onClick={() => clickHandler1(color?.color?.id, color?.image)}
            key={index}
            className={`h-8 w-8 rounded-full ${color?.color?.id === colorId ? 'border-4 border-purple-500' : ''}`}
            style={{ backgroundColor: color?.color?.hexCode }}
          ></div>
        ))}
      </div>
                </div>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submitData)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="itemSize"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col items-center">
                            <FormLabel className="w-36 relative -top-4 right-32 text-xl">
                              Sizes:
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Your Size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  { cleanedSizes.map(
                                    (size: string) => (
                                      <SelectItem key={size} value={size}>
                                        {size}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                          <FormMessage className="relative left-[105px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <div>
                          <FormItem className="flex flex-col items-center">
                            <FormLabel className="w-36 relative -top-2 right-32 text-xl">
                              Quantity:
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Quantity"
                                className="w-[300px]"
                                type="number"
                              />
                            </FormControl>
                          </FormItem>
                          <div className="flex justify-center mx-auto gap-5 my-4">
                            <Button
                              type="submit"
                              className="px-16"
                              variant={"purple"}
                            >
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </form>
              </Form>
              <div className="w-96">
                <Accordian
                  description={product?.product?.description}
                  material={product?.product?.material}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto">
        <div>
          <UserWebsite title={"Similar Product Which You Might Like"} />
        </div>
      </div>
    </div>
  );
};

export default ProductInDetail;
