import { Button } from "@/components/ui/button";
import { updateCategoryApi, deleteCategoryApi } from "@/features/api/apicall";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "sonner";
import { Cross, CrossIcon, Save, X } from "lucide-react";
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

export type Category = {
  categoryID: number;
  categoryName: string;
  images: string;
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(row.original.categoryName);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    row.original.images
  );
  const [cookie] = useCookies(["auth"]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setCategoryName(row.original.categoryName);
    setPreviewImage(row.original.images);
  };

  const handleDeleteClick = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await deleteCategoryApi(payload, row.original.categoryID);
      console.log(res, "Delete successful");

      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category. Please try again later.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleCategoryUpdate = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      }
      formData.append("name", categoryName);

      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
        "Content-Type": "multipart/form-data",
      };

      const res = await updateCategoryApi(
        payload,
        row.original.categoryID,
        formData
      );
      console.log(res, "Update successful");

      setIsEditing(false);

      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category. Please try again later.");
    }
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
                      Make changes to your category here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name">Image:</Label>
                      <div>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="max-h-20"
                          />
                        )}
                        <Input
                          type="file"
                          onChange={handleImageChange}
                          className="my-4 w-60"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description">Name:</Label>

                      <Input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="p-4 w-60"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant={"green"}
                      onClick={handleCategoryUpdate}
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
            <div className="flex items-center">
            <div className="flex gap-5">
                <Button
                  onClick={handleCancelClick}
                  name="cancel"
                  variant={"red"}
                >
                  <X /> Cancel
                </Button>
                <Button
                
                  name="update"
                  variant={"green"}
                >
                  <Save /> Update
                </Button>
              </div>
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
      <div></div>
    );
  }
  return <span>{value}</span>;
};

const columnHelper = createColumnHelper<Category>();
export const columns = [
  columnHelper.accessor("categoryID", {
    header: "Category ID",
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("images", {
    header: "images",
  }),
  columnHelper.accessor("categoryName", {
    header: "Category Name",
    cell: TableCell,
  }),
  columnHelper.display({
    header: "Actions",
    id: "edit",
    cell: ({ row, table }: any) => <EditCell row={row} table={table} />,
  }),
];
