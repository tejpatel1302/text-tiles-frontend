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

const ProductInDetail = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserCurrentToken);
  console.log(token, "admin token");
  const form = useForm<z.infer<typeof AddToCartSchema>>({
    defaultValues: {
      productId: "string",
      itemSize: "string",
      colorRelationId: "string",
      quantity: 1,
    },

    mode: "onChange",
    resolver: zodResolver(AddToCartSchema),
  });

  const [product, setProduct]: any = useState(null);
  const [showColors, setShowColors]: any = useState([]);
  const [showColorsRel, setShowColorsRel]: any = useState([]);
  const [colorId, setColorId]: any = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = React.useState([] as any);
  const params = useParams();
  const { productId } = params;

  async function fetchProductsData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const res = await getSingleProductApi(payload, productId);
      setProduct(res);
      console.log(res, "hihello");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      setLoading(false);
    }
  }
  console.log(product);
  useEffect(() => {
    fetchProductsData();
    async function fetchUserData() {
      try {
        const payload = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        const res = await getUserApi(payload);
        setUser(res?.data);
        console.log(res, "getUser");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    }
    fetchUserData();
  }, [productId]);

  const submitData = async (data: any) => {
    console.log(data, 'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    try {
      // const formData = new FormData();
      // formData.append("productId", product?.product?.id);
      // formData.append("quantity", data.quantity );
      // formData.append("itemSize", data.itemSize);
      // formData.append("colorRelationId", colorId);



      const FilteredData = {
        productId: product?.product?.id,
        quantity: Number(data.quantity),
        itemSize: data.itemSize,
        colorRelationId: showColorsRel[0].id
      };

      console.log(FilteredData, "hiiiiiiiiiiiiiiii");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      };

      const res = await addToCartApi(FilteredData, config);
      console.log(res, "addedsubmitCartData");
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  async function fetchColorsData() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getColorsApi(payload);
      console.log(res, "getColors");
      setShowColors(res?.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  useEffect(() => {
    fetchColorsData()
    fetchColorsRelation()
  }, []);
  async function fetchColorsRelation() {
    try {
      const payload = {
        Authorization: `Bearer ${token}`,
      };


      const res = await getProductsWithColorIdApi(payload, productId);
      console.log(res, "getColorsRllel");
      setShowColorsRel(res);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
  useEffect(() => {
  }, []);

  function clickHandler(colorId: any) {

    setColorId(colorId);
  }
  console.log(colorId, '124112423')
  return (
    <div>
      <div className="flex justify-center items-center w-10/12 mx-auto py-8">
        {product && (
          <div className="flex gap-8">
            <div className="border border-gray-300 h-[450px] w-[400px] rounded-lg overflow-hidden flex justify-center items-center">
              <img src={`data:image/jpeg;base64,${showColorsRel[0].image.buffer}`} alt={product?.title} className="h-96" />
            </div>
            <div className="flex flex-col justify-center max-w-[500px]">
              <h2 className="text-3xl font-semibold mb-4 ">
                {product?.product?.name}
              </h2>
              <div className="text-xl mb-4 ">
                Price: {product?.product?.price} €
              </div>
              <div className="mb-4">
                <div>
                  <div className="mb-2">Colors</div>
                  <div className="flex gap-3">
                    {showColors.map((color: any, index: any) => (
                      <div
                        onClick={() => { clickHandler(color.id) }}
                        key={index}
                        className={`h-8 w-8 rounded-full ${''} ? 'border-4 border-black' : ''
                          }`}

                        style={{ backgroundColor: color.hexCode }}
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
                            <FormLabel className="w-36 relative -top-4 right-32 text-xl">Sizes:</FormLabel>
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
                                <SelectContent >
                                  {["S", "M", "L", "XL", "XXL"]?.map(
                                    (size: any) => {
                                      return (
                                        <SelectItem key={size} value={size}>
                                          {size}
                                        </SelectItem>
                                      );
                                    }
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
                            <FormLabel className="w-36 relative -top-2 right-32 text-xl">Quantity:</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Quantity" className="w-[400px]" type="number" />
                              {/* onChange={handleImageChange}  */}

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
                <Accordian />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" mx-auto">
        <div>
          <UserWebsite title={"Similar Product Which You Might Like"} />
        </div>
      </div>
    </div>
  );
};

export default ProductInDetail;
