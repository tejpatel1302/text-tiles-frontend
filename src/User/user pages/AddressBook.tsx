import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/common/Data-table";
import { getAddressApi, updateAddressApi, deleteAddressApi } from "@/features/api/apicall";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Address } from "@/utils/address-column";
import { createColumnHelper } from "@tanstack/react-table";

const AddressBook = () => {
  const [cookie] = useCookies(["auth"]);
  const [showAddresses, setShowAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getAddressApi(headers);
        setShowAddresses(res?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [cookie.auth]);

  const handleRemoveAddress = async (id) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const res = await deleteAddressApi(payload, id);
      toast.success("Address deleted successfully");
      setShowAddresses(showAddresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleProductUpdate = async (id, updatedData) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const res = await updateAddressApi(payload, id, updatedData);
      toast.success("Address updated successfully");
      // You may want to update the local state here with the updated data
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setShowAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, [name]: value } : address
      )
    );
  };

  const columnHelper = createColumnHelper<Address>();
  const columns = [
    columnHelper.accessor("id", {
      header: "Address ID",
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("billToName", {
      header: "billToName",
      
    }),
   columnHelper.accessor("address1", {
        header: "address1",
       
      }),
    columnHelper.accessor("address2", {
      header: "address2",
      
    }),
    columnHelper.accessor("city", {
        header: "city",
    
      }),
    columnHelper.accessor("county", {
      header: "county",
      meta: {
        type: "number",
      },
      
    }),
    columnHelper.accessor("eir", {
      header: "eir",
      
    }),
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <ActionsCell
          address={row.original}
          handleRemoveAddress={handleRemoveAddress}
          handleProductUpdate={handleProductUpdate}
        />
      ),
    },
  ];
  const data: Address[] = showAddresses?.map((data:any) => ({
    id: data?.id,
    address1: data?.address1,
    address2: data?.address2,
    billToName: data?.billToName,
    city: data?.city,
    county: data?.county,
    eir: data?.eir,
    
    
    
    
    
  }));
  console.log(data,'mainmapdata')
  return (
    <div className="p-8">
      <div className="my-8 text-3xl font-bold">Manage Address Book</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

const ActionsCell = ({ address, handleRemoveAddress, handleProductUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(address);
  const [initialData, setInitialData] = useState(address);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedData(initialData);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleProductUpdate(address.id, updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex gap-5">
      {!isEditing ? (
        <>
          <Button onClick={handleEditClick} variant="green">
            Edit
          </Button>
          <Button onClick={() => handleRemoveAddress(address.id)} variant="red">
            Delete
          </Button>
        </>
      ) : (
        <>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="billToName"
                placeholder="Enter bill to name"
                value={updatedData.billToName}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address1">Address 1:</Label>
              <Input
                type="text"
                id="address1"
                name="address1"
                placeholder="Enter address 1"
                value={updatedData.address1}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address2">Address 2:</Label>
              <Input
                type="text"
                id="address2"
                name="address2"
                placeholder="Enter address 2"
                value={updatedData.address2}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city">City:</Label>
              <Input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={updatedData.city}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="county">County:</Label>
              <Input
                type="text"
                id="county"
                name="county"
                placeholder="Enter county"
                value={updatedData.county}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eir">EIR:</Label>
              <Input
                type="text"
                id="eir"
                name="eir"
                placeholder="Enter eir"
                value={updatedData.eir}
                onChange={handleInputChange}
                className="p-4 w-60"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <Button onClick={handleSaveClick} variant="green">
              Save
            </Button>
            <Button onClick={handleCancelClick} variant="red">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressBook;
