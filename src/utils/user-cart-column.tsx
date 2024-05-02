import { Button } from "@/components/ui/button";
import { cartUpdateApi, deleteCartIndividualApi } from "@/features/api/apicall";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Cross, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IconRight } from "react-day-picker";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
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
import DataTableRowActions from "./DataTableRowAction";

export type UserCart = {
  id: string,
  quantity: any,
  images: any,
  name: any,
  itemSize: any,
  totalPrice: any,
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<UserCart>(row.original);
  const [initialProductData, setInitialProductData] = useState<UserCart>(row.original); // to store initial product data
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

  const handleDeleteClick = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      
      // Make API call to delete the product
      const res = await deleteCartIndividualApi(payload, row.original.id);
      
      console.log(res, "Product deleted successfully");
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again later.");
    }
  };

  const handleProductUpdate = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
  
      // Initialize editedFields with the fields that must always be present
      const editedFields: Partial<UserCart> = {
        quantity: parseInt(productData.quantity, 10)
      };
      
  
      // Send the edited fields in the request body
      const res = await cartUpdateApi(
        payload,
        row.original.id,
        editedFields
      );
      console.log(res, "Update successful");
  
      setIsEditing(false);
  
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again later.");
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
    <div className="edit-cell-container">
      <div> 
        <Toaster position="top-center" />
      </div>
      <div className="edit-cell-action -ml-16">
        {!isEditing ? (
          <>
           <div className="flex gap-5">
           <Dialog>
                <DialogTrigger asChild>
                  <Button variant="green">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Cart</DialogTitle>
                    <DialogDescription>
                      Make changes to your cart here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      

                      <Label htmlFor="name">Product Quantity:</Label>
<input
  type="number"
  id="quantity"
  name="quantity"
  placeholder="Enter product name"
  value={productData.quantity}
  onChange={handleInputChange}
  className="p-4 w-40"
/>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant={"green"}
                      onClick={handleProductUpdate}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            <Button onClick={handleDeleteClick} name="delete" variant={"red"}>
              Delete
            </Button>
           </div>
          </>
        ) : (
          <>
           <div className="flex flex-col gap-4">
           <label htmlFor="name">Product Quantity:</label>
<input
  type="number"
  id="quantity"
  name="quantity"
  placeholder="Enter product name"
  value={productData.quantity}
  onChange={handleInputChange}
  className="p-4 w-40"
/>



           </div>
           <div className="flex gap-5 mt-10">
           <Button  name="update" variant={"green"}>
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

export const getCartColumns = ({ onEdit, onDelete }: any) => [
  {
      accessorKey: "id",
      header: "Product ID",
  },
  {
      accessorKey: "images",
      header: "images",
  },
  {
      accessorKey: "name",
      header: "Name",
  },
  {
      accessorKey: "itemSize",
      header: "Size",
  },
  {
      accessorKey: "quantity",
      header: "Quantity",
  },
  {
      accessorKey: "totalPrice",
      header: "Price",
  },
  {
      accessorKey: "total",
      header: "Total",
      cell: ({row}:any) => {
          const result = row.getValue('quantity') * row.getValue('totalPrice');
          const formattedResult = result.toFixed(2); // Limit to 2 decimal places
          console.log(formattedResult,'ko')
          return (
              <div>
                  {formattedResult}
              </div>
          );
      }
  },
  {
      id: "edit",
      cell: ({ row }: any) => (
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      ),
    }
];


