import { Address, getAddressColumns } from "@/utils/address-column";
import { DataTable } from "@/components/common/Data-table";
import { useCallback, useMemo, useState } from "react"; // Removed unused imports
import { useSelector } from "react-redux";
import { deleteAddressApi, getAddressApi } from "@/features/api/apicall"; // Removed unused import
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import UpdateAddressForm from "./UpdateAddressForm";
import { CardContent } from "@/components/ui/card";

const AddressBook = () => {
  const [cookie] = useCookies(["auth"]);
  const [isDialogOpen, setIsDialogOpen]:any = useState(false);
  const [selectedAddress, setSelectedAddress]:any = useState(null)
  const queryClient = useQueryClient();
  const getAddresses = async () => {
    try {
      const headers = { Authorization: `Bearer ${cookie.auth}` };
      const res = await getAddressApi(headers);
      return res.data; // Removed commented out code
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleRemoveAddress = async (id:any) => {
          try {
            const payload = {
              Authorization: `Bearer ${cookie.auth}`,
            };
      
            const res = await deleteAddressApi(payload, id);
            console.log(res, "hihello");
          } catch (error) {
            console.error("Error fetching subcategory data:", error);
          }
        };

  const { isFetching,  data: AddressData } = useQuery({
    queryKey: ["addressData"],
    queryFn: getAddresses,
  });

  const data: Address[] = AddressData
    ? AddressData.map((address: any) => ({
        id: address.id,
        address1: address.address1,
        address2: address.address2,
        billToName: address.billToName,
        city: address.city,
        county: address.county,
        eir: address.eir,
      }))
    : [];

    const deleteMutation = useMutation({
      mutationFn: handleRemoveAddress,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey:  ["addressData"] });
      },
    });

    const onDelete = useCallback((address: any) => {
      deleteMutation.mutate(address.id, {
        onSuccess: () => {
          toast('Deleted Successfully');
        },
        onError: () => {
          toast('Something went wrong');
        },
      });
    }, []);

  const onEdit = useCallback((address: any) => {
    setSelectedAddress(address)
    setIsDialogOpen(true)
    
  }, []);

  const columns = useMemo(() => getAddressColumns({ onEdit, onDelete }), [
    onDelete,
    onEdit,
  ]); // Added missing dependencies

  return (
    <TableCard className="h-full">
            <Toaster/>
      <CardHeader>
        <CardTitle className="font-bold">Address Book</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <UpdateAddressForm
              isOpen={isDialogOpen}
              address={selectedAddress}
              onOpenChange={(value:any) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedAddress(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching && <span>Loading</span>}
        {!isFetching && <DataTable data={data} columns={columns} />}
      </CardContent>
    </TableCard>
  );
};

export default AddressBook;
