import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { z } from "zod";
import {
  deletePaymentMethodsApi,
  getAddressApi,
  getPaymentApi,
  getUserApi,
  updateMyDetailsApi,
  updatePaymentCardApi,
} from "@/features/api/apicall";
import { AddressSchema, CardSchema, UpdateUserDetailsSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MyDetails() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [cookie] = useCookies(["auth"]);
  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getPaymentApi(headers);
        setUsers(res?.data || []);
        // Initialize editMode for each user
        const initialEditMode = {};
        res?.data.forEach((user) => {
          initialEditMode[user.id] = false;
        });
        setEditMode(initialEditMode);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookie.auth]);

  const toggleEditMode = (id) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: !prevEditMode[id],
    }));
  };

  const submitData = async (id) => {
    try {
      const formData = form.getValues();
      const user = users.find((user) => user.id === id);
  
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
  
      // Filter out unchanged fields and construct the updated request body
      const updatedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (formData[key] !== user[key]) {
          acc[key.split("-")[0]] = value;
        }
        return acc;
      }, {});
  
      const res = await updatePaymentCardApi(payload, id, updatedData);
      if (res.status === 200) {
        toast.success("User details updated successfully");
        toggleEditMode(id); // Exit edit mode after successful update
      } else {
        toast.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };
  
  
  const handleRemovePaymentMethod = async (id) => {
    try {
      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };
      const res = await deletePaymentMethodsApi(payload, id);
      console.log(res, "hihello");
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }
  };

  return (
    <div className="flex gap-4 px-4 w-10/12 lg:flex-col lg:gap-6 xl:gap-10 mx-auto">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 border-b-2 border-black">
            <div className="text-3xl font-bold m-4">My Details</div>
          </div>
        </div>
      </div>
      {users.map((user) => (
        <div key={user.id} className="flex gap-4">
          <div className="space-y-4 w-6/12">
            <div>
              <div>
                <form
                  {...form}
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission
                    submitData(user.id); // Call submitData directly
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor={`cardType-${user.id}`}>Card Type:</label>
                    {!editMode[user.id] ? (
                      <div>{user?.cardType}</div>
                    ) : (
                      <div>
                        <input
                          id={`cardType-${user.id}`}
                          {...form.register(`cardType-${user.id}`)}
                          defaultValue={user?.cardType}
                          name={`cardType`} // Ensure a consistent structure
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={`cardNumber-${user.id}`}>Card Number:</label>
                    {!editMode[user.id] ? (
                      <div>{user?.cardNumber}</div>
                    ) : (
                      <div>
                        <input
                          id={`cardNumber-${user.id}`}
                          {...form.register(`cardNumber-${user.id}`)}
                          defaultValue={user?.cardNumber}
                          name={`cardNumber`} // Ensure a consistent structure
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={`CardHolder-${user.id}`}>Card Holder Name:</label>
                    {!editMode[user.id] ? (
                      <div>{user?.CardHolder}</div>
                    ) : (
                      <div>
                        <input
                          id={`CardHolder-${user.id}`}
                          {...form.register(`CardHolder-${user.id}`)}
                          defaultValue={user?.CardHolder}
                          name={`CardHolder`} // Ensure a consistent structure
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={`expiryDate-${user.id}`}>Expiry Date:</label>
                    {!editMode[user.id] ? (
                      <div>{user?.expiryDate}</div>
                    ) : (
                      <div>
                        <input
                          id={`expiryDate-${user.id}`}
                          {...form.register(`expiryDate-${user.id}`)}
                          defaultValue={user?.expiryDate}
                          name={`expiryDate`} // Ensure a consistent structure
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={`cvv-${user.id}`}>CVV:</label>
                    {!editMode[user.id] ? (
                      <div>{user?.cvv}</div>
                    ) : (
                      <div>
                        <input
                          id={`cvv-${user.id}`}
                          {...form.register(`cvv-${user.id}`)}
                          defaultValue={user?.cvv}
                          name={`cvv`} // Ensure a consistent structure
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  {!editMode[user.id] ? (
                    <button
                      className="float-right mr-2 mt-2 px-10 py-4"
                      onClick={() => toggleEditMode(user.id)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="float-right mr-2 mt-2 px-10 py-4"
                      >
                        Save
                      </button>
                      <button
                        className="float-right mr-2 mt-2 px-10 py-4"
                        onClick={() => toggleEditMode(user.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <div onClick={() => handleRemovePaymentMethod(user.id)}>
                    Delete
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Other card and components */}
        </div>
      ))}
    </div>
  );
}
