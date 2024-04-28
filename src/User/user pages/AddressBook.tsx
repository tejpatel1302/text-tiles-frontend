import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { z } from "zod";
import { deleteAddressApi, getAddressApi, updateAddressApi, updateMyDetailsApi } from "@/features/api/apicall";
import { AddressSchema, UpdateUserDetailsSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MyDetails() {
  const [users, setUser]:any = useState(null);
  const [editMode, setEditMode]:any = useState(false);
  const [editedUsers, setEditedUsers]:any = useState(null);
  const [cookie] = useCookies(["auth"]);
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      billToName: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      eir: '',
      // Add other fields here
    },
    mode: "all",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getAddressApi(headers);
        setUser(res?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [cookie.auth]);

  const submitData = async (data: any, userId: any) => {
    try {
      const req = {
        address1: data.address1,
        address2: data.address2,
        billToName: data.billToName,
        city: data.city,
        county: data.county,
        eir: data.eir,
        // Add other fields here
      };

      const payload = {
        Authorization: `Bearer ${cookie.auth}`,
      };

      const res = await updateAddressApi(payload, userId, req);
      toast.success("User details updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };

  const handleRemoveAddress = async (id: any) => {
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

  return (
    <div className="flex gap-4 px-4 w-10/12 lg:flex-col lg:gap-6 xl:gap-10 mx-auto">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 border-b-2 border-black">
            <div className="text-3xl font-bold m-4 ">Address Book</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="space-y-4  w-6/12">
          <div>
            <div>
              {users && users.map((user: any) => (
                <form key={user.id} {...form} onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit((data) => submitData(data, user.id))();
                }} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="billToName">Name:</label>
                    {!editMode[user.id] ? (
                      <div>{user.billToName}</div>
                    ) : (
                      <div>
                        <input
                          id="billToName"
                          {...form.register("billToName")}
                          defaultValue={editedUsers?.billToName}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], billToName: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address1">Address Line 1:</label>
                    {!editMode[user.id] ? (
                      <div>{user.address1}</div>
                    ) : (
                      <div>
                        <input
                          id="address1"
                          {...form.register("address1")}
                          defaultValue={editedUsers?.address1}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], address1: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address2">Address Line 2:</label>
                    {!editMode[user.id] ? (
                      <div>{user.address2}</div>
                    ) : (
                      <div>
                        <input
                          id="address2"
                          {...form.register("address2")}
                          defaultValue={editedUsers?.address2}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], address2: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city">City:</label>
                    {!editMode[user.id] ? (
                      <div>{user.city}</div>
                    ) : (
                      <div>
                        <input
                          id="city"
                          {...form.register("city")}
                          defaultValue={setEditedUsers?.city}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], city: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="county">County:</label>
                    {!editMode[user.id] ? (
                      <div>{user.county}</div>
                    ) : (
                      <div>
                        <input
                          id="county"
                          {...form.register("county")}
                          defaultValue={editedUsers?.county}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], county: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="eir">EIR:</label>
                    {!editMode[user.id] ? (
                      <div>{user.eir}</div>
                    ) : (
                      <div>
                        <input
                          id="eir"
                          {...form.register("eir")}
                          defaultValue={editedUsers?.eir}
                          onChange={(e) => setEditedUsers({ ...editedUsers, [user.id]: { ...editedUsers[user.id], eir: e.target.value } })}
                          className="w-80"
                        />
                      </div>
                    )}
                  </div>
                  {/* Add other fields here */}
                  {!editMode[user.id] ? (
                    <button className="float-right mr-2 mt-2 px-10 py-4" onClick={() => setEditMode({ ...editMode, [user.id]: true })}>Edit</button>
                  ) : (
                    <button className="float-right mr-2 mt-2 px-10 py-4" type="submit">Save</button>
                  )}
                  <div onClick={() => handleRemoveAddress(user.id)}>
                    Delete
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
        {/* Other card and components */}
      </div>
    </div>
  );
}
