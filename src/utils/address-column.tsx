import { deleteAddressApi, deleteProductApi, updateAddressApi, updateProductApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type Address = {
  billToName: string,
  address1: string,
  address2: string,
  city: string,
  county: string,
  eir: string,
  id: string
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<Address>(row.original);
  const [initialProductData, setInitialProductData] = useState<Address>(row.original); // to store initial product data
  const [cookie] = useCookies(["auth"]);

  useEffect(() => {
    // Reset productData when isEditing changes to false
    if (!isEditing) {
      setProductData(initialProductData);
    }
  }, [isEditing, initialProductData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setInitialProductData(productData); // Store initial product data
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleRemoveAddress = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await deleteAddressApi(payload, row.original.id);
      console.log(res, "hihello");
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }
  };

  const handleProductUpdate = async () => {
    try {
      const req = {
        address1: productData.address1,
        address2: productData.address2,
        billToName: productData.billToName,
        city: productData.city,
        county: productData.county,
        eir: productData.eir,
        // Add other fields here
      };

      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await updateAddressApi(payload, row.original.id , req);

      toast.success("User details updated successfully");
   
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-cell-container mr-32">
      <div> 
        <Toaster position="top-center" />
      </div>
      <div className="edit-cell-action">
        {!isEditing ? (
          <>
           <div className="flex gap-5">
           <Dialog>
      <DialogTrigger asChild>
        <Button variant="green">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Products</DialogTitle>
          <DialogDescription>
            Make changes to your address here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Name:</Label>
<Input
  type="text"
  id="name"
  name="billToName"
  placeholder="Enter product name"
  value={productData.billToName}
  onChange={handleInputChange}
  className="p-4 w-60"
/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           
<Label htmlFor="description">Address 1:</Label>
<Input
  type="text"
  id="description"
  name="address1"
  placeholder="Enter product address1"
  value={productData.address1}
  onChange={handleInputChange}
  className="p-4 w-60"
/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           
          <Label htmlFor="price">Address 2:</Label>
<Input
  type="text"
  id="price"
  name="address2"
  placeholder="Enter product address2"
  value={productData.address2}
  onChange={handleInputChange}
  className="p-4 w-60"
/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           

          <Label htmlFor="size">City:</Label>
<Input
  type="text"
  id="size"
  name="city"
  placeholder="Enter product city"
  value={productData.city}
  onChange={handleInputChange}
  className="p-4 w-60"
/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           
          <Label htmlFor="material">County:</Label>
<Input
  type="text"
  id="material"
  name="county"
  placeholder="Enter product county"
  value={productData.county}
  onChange={handleInputChange}
  className="p-4 w-60"
/>

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           
          
          <Label htmlFor="material">eir:</Label>
<Input
  type="text"
  id="material"
  name="eir"
  placeholder="Enter product eir"
  value={productData.eir}
  onChange={handleInputChange}
  className="p-4 w-60"
/>

          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={'green'} onClick={handleProductUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            <Button onClick={handleRemoveAddress} name="delete" variant={"red"}>
              Delete
            </Button>
           </div>
          </>
        ) : (
          <>
           <div className="flex flex-col gap-4">
           <label htmlFor="name">Product Name:</label>
<input
  type="text"
  id="name"
  name="billToName"
  placeholder="Enter product name"
  value={productData.billToName}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="description">Product Description:</label>
<input
  type="text"
  id="description"
  name="address1"
  placeholder="Enter product description"
  value={productData.address1}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="price">Product Price:</label>
<input
  type="text"
  id="price"
  name="address2"
  placeholder="Enter product price"
  value={productData.address2}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="city">Product city:</label>
<input
  type="text"
  id="city"
  name="city"
  placeholder="Enter product city"
  value={productData.city}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="material">Product Material:</label>
<input
  type="text"
  id="material"
  name="county"
  placeholder="Enter product material"
  value={productData.county}
  onChange={handleInputChange}
  className="p-4"
/>
<label htmlFor="material">Product Material:</label>
<input
  type="text"
  id="material"
  name="eir"
  placeholder="Enter product material"
  value={productData.eir}
  onChange={handleInputChange}
  className="p-4"
/>

           </div>
           <div className="flex gap-5 mt-10">
           <Button onClick={handleProductUpdate} name="update" variant={"green"}>
              Update
            </Button>
            <Button onClick={handleCancelClick} name="cancel" variant={"red"}>
              Cancel
            </Button>
           </div>
          </>
        )}
      </div>
    </div>
  );
};

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e: any) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        className="border-2 border-black w-8/12 p-4"
      />
    );
  }
  return <span>{value}</span>;
};

const columnHelper = createColumnHelper<Address>();
export const columns = [
  columnHelper.accessor("id", {
    header: "Address ID",
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("billToName", {
    header: "billToName",
    cell: TableCell,
  }),
 columnHelper.accessor("address1", {
      header: "address1",
      cell: TableCell
    }),
  columnHelper.accessor("address2", {
    header: "address2",
    cell: TableCell,
  }),
  columnHelper.accessor("city", {
      header: "city",
      cell: TableCell
    }),
  columnHelper.accessor("county", {
    header: "county",
    meta: {
      type: "number",
    },
    cell: TableCell,
  }),
  columnHelper.accessor("eir", {
    header: "eir",
    cell: TableCell,
  }),

  columnHelper.display({
    header: "Actions",
    id: "edit",
    cell: ({ row, table }: any) => <EditCell row={row} table={table}  />,
  }),
];
