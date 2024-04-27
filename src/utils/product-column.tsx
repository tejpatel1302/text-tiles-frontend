import { deleteProductApi, updateProductApi } from "@/features/api/apicall";
import { selectAdminCurrentToken } from "@/features/redux_toolkit/authSlice";
import { createColumnHelper } from "@tanstack/react-table";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  material: string;
  colors:any;
  images:any;
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<Product>(row.original);
  const [initialProductData, setInitialProductData] = useState<Product>(row.original); // to store initial product data
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
      const res = await deleteProductApi(payload, row.original.id);
      
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
      const editedFields: Partial<Product> = {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        size: productData.size,
        material: productData.material,
      };
  
      // Send the edited fields in the request body
      const res = await updateProductApi(
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
    <div className="edit-cell-container mr-32">
      <div> 
        <Toaster position="top-center" />
      </div>
      <div className="edit-cell-action">
        {!isEditing ? (
          <>
           <div className="flex gap-5">
           <Button onClick={handleEditClick} name="edit" variant={"green"}>
              Edit
            </Button>
            <Button onClick={handleDeleteClick} name="delete" variant={"red"}>
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
  name="name"
  placeholder="Enter product name"
  value={productData.name}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="description">Product Description:</label>
<input
  type="text"
  id="description"
  name="description"
  placeholder="Enter product description"
  value={productData.description}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="price">Product Price:</label>
<input
  type="number"
  id="price"
  name="price"
  placeholder="Enter product price"
  value={productData.price}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="size">Product Size:</label>
<input
  type="text"
  id="size"
  name="size"
  placeholder="Enter product size"
  value={productData.size}
  onChange={handleInputChange}
  className="p-4"
/>

<label htmlFor="material">Product Material:</label>
<input
  type="text"
  id="material"
  name="material"
  placeholder="Enter product material"
  value={productData.material}
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

const columnHelper = createColumnHelper<Product>();
export const columns = [
  columnHelper.accessor("id", {
    header: "Product ID",
    meta: {
      type: "number",
    },
  }),
 columnHelper.accessor("images", {
      header: "images",
      cell: TableCell
    }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: TableCell,
  }),
  columnHelper.accessor("colors", {
      header: "Colors",
      cell: TableCell
    }),
  columnHelper.accessor("price", {
    header: "Price",
    meta: {
      type: "number",
    },
    cell: TableCell,
  }),
  columnHelper.accessor("size", {
    header: "Size",
    cell: TableCell,
  }),
  columnHelper.accessor("material", {
    header: "Material",
    cell: TableCell,
  }),
  columnHelper.display({
    header: "Actions",
    id: "edit",
    cell: ({ row, table }: any) => <EditCell row={row} table={table} />,
  }),
];
