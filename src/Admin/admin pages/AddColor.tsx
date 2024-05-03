
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
  } from "@/components/ui/select"

  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { zodResolver } from "@hookform/resolvers/zod";

  import { useForm } from "react-hook-form";
  import { z } from "zod";
import { useCookies } from 'react-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addColorsApi, getColorsApi } from "@/features/api/apicall";
import { AddColorSchema } from "@/utils/schemas";
import { useState } from "react";
import { toast } from "sonner";

const AddColor = ({row}:any) => {
    const [cookie] = useCookies(["auth"]);
    const queryClient = useQueryClient();
    const [showColors, setShowColors]: any = useState([]);

    const form = useForm<z.infer<typeof AddColorSchema>>({
      resolver: zodResolver(AddColorSchema),

      defaultValues: {
        productId:'',
        colorId: '',
        file: ''
      },
      mode: "all",
    });
    async function getColorsData() {
        try {
          const payload = {
            Authorization: `Bearer ${cookie.auth}`,
    
          };
    
          const res = await getColorsApi(payload);
          console.log(res, 'getColors')
          return res.data;
    
    
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
      const { isFetching,  data: ColorData } = useQuery({
        queryKey: ["colorData"],
        queryFn: getColorsData,
      });


      const handleColorsUpdate = async (req: any) => {
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${cookie.auth}`,
                  'Content-Type': 'multipart/form-data'
                }
              };
    
          // Initialize editedFields with the fields that must always be present
    
          // Send the edited fields in the request body
          const res = await addColorsApi(req, config);
          console.log(res, "Update successful");
    
          toast.success("Product updated successfully");
        } catch (error) {
          console.error("Error updating product:", error);
          toast.error("Error updating product. Please try again later.");
        }
      };




      const onUpdateSuccess = async () => {
        await queryClient.invalidateQueries({ queryKey: ["productData"] });
    
   
      };
      const onRequestError = () => {
        toast("Error");
      };
      const updateMutation = useMutation({
        mutationFn: handleColorsUpdate,
        onSuccess: onUpdateSuccess,
        onError: onRequestError,
      });
      const onSubmit: any = (values: any) => {
        console.log(values)
        const formData = new FormData();
      formData.append('colorId', values.colorId);
      formData.append('productId', row.original.id);
      formData.append('file', values.file[0]);
    
        updateMutation.mutate(formData);
      };
      const fileRef = form.register('file', { required: true });
  return (
    <Form {...form}>
        <form className="space-y-4">
          <div className="space-y-4">
          <FormField
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem >
                        <div className="flex items-center">
                          <FormLabel className="w-16">Color:</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                ColorData?.map((color: any) => {
                                  return (
                                    <SelectItem key={color?.id} value={color?.id}>{color?.name}</SelectItem>
                                  )
                                })
                              }
                            </SelectContent>
                          </Select>
                          {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link to="/examples/forms">email settings</Link>.
              </FormDescription> */}
                        </div>
                        <FormMessage className="relative left-[105px]" />
                      </FormItem>
                    )}
                  />
            <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <div>
                        <FormItem >
                          <div className="flex items-center">
                            <FormLabel className="w-16">Image:</FormLabel>
                            <FormControl>
                              <Input {...fileRef} type="file" className="w-[300px]" />
                            </FormControl>
                          </div>
                          <FormMessage className="relative left-[105px]" />
                        </FormItem>
                       
                      </div>
                    )}
                  />
            
           

            <Button
              variant={"green"}
              // disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
  )
}

export default AddColor