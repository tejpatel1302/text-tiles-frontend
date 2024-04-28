import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { z } from "zod";
import { getUserApi, updateMyDetailsApi } from "@/features/api/apicall";
import { UpdateUserDetailsSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MyDetails() {
  const [user, setUser]:any = useState(null);
  const [editMode, setEditMode]:any = useState(false);
  const [editedUser, setEditedUser]:any = useState(null);
  const [cookie] = useCookies(["auth"]);
  const form = useForm<z.infer<typeof UpdateUserDetailsSchema>>({
    resolver: zodResolver(UpdateUserDetailsSchema),
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      gender: "",
      phoneNum: "",
    },
    mode: "all",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${cookie.auth}` };
        const res = await getUserApi(headers);
        console.log(res?.data?.customerSession?.CustomerId

        )
        setUser(res?.data);
        setEditedUser(res?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookie.auth]);

  const submitData = async (data: any) => {
    const dobISOString = new Date(data.dob).toISOString();
    try {
      const req = {
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[1],
        email: data.email,
      
        phoneNum: data.phoneNum,
        dob:dobISOString  ,
       
      };

      const payload = {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      };

      const res = await updateMyDetailsApi(payload, req);
      toast.success("User details updated successfully");
      setEditMode(false);
      console.log(res, "addedsubmitData");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };

  function convertDateFormat(dateString: any) {
    if (!dateString) return "";
    const datePart = dateString.split("T")[0];
    return datePart;
  }

  return (
    <div className="flex gap-4 px-4 w-10/12 lg:flex-col lg:gap-6 xl:gap-10 mx-auto">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <div className="flex gap-4 border-b-2 border-black">
            <div className="text-3xl font-bold m-4 ">My Details</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="space-y-4  w-6/12">
          <div>
            <div>
              <form {...form} onSubmit={form.handleSubmit(submitData)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">Name:</label>
                  {!editMode ? (
                    <div>{`${user?.user?.firstName} ${user?.user?.lastName}`}</div>
                  ) : (
                    <div>
                      <input
                        id="name"
                        {...form.register("name")}
                        defaultValue={`${editedUser?.user?.firstName} ${editedUser?.user?.lastName}`}
                        onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, firstName: e.target.value.split(" ")[0], lastName: e.target.value.split(" ")[1] } })}
                        className="w-80"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="dob">Date of Birth:</label>
                  {!editMode ? (
                    <div>{convertDateFormat(user?.user?.dob)}</div>
                  ) : (
                    <div>
                      <input
                        id="dob"
                        type="date"
                        {...form.register("dob")}
                        defaultValue={convertDateFormat(editedUser?.user?.dob)}
                        onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, dob: e.target.value } })}
                        className="w-80"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email:</label>
                  {!editMode ? (
                    <div>{user?.user?.email}</div>
                  ) : (
                    <div>
                      <input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        defaultValue={editedUser?.user?.email}
                        onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, email: e.target.value } })}
                        className="w-80"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender">Gender:</label>
                  {!editMode ? (
                    <div>{user?.user?.gender}</div>
                  ) : (
                    <div>
                      <select
                        id="gender"
                        {...form.register("gender")}
                        defaultValue={editedUser?.user?.gender}
                        onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, gender: e.target.value } })}
                        className="w-80"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phoneNum">Mobile Number:</label>
                  {!editMode ? (
                    <div>{user?.user?.phoneNum}</div>
                  ) : (
                    <div>
                      <input
                        id="phoneNum"
                        type="tel"
                        {...form.register("phoneNum")}
                        defaultValue={editedUser?.user?.phoneNum}
                        onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, phoneNum: e.target.value } })}
                        className="w-80"
                      />
                    </div>
                  )}
                </div>
                {!editMode ? (
                  <button className="float-right mr-2 mt-2 px-10 py-4" onClick={() => setEditMode(true)}>Edit</button>
                ) : (
                  <button className="float-right mr-2 mt-2 px-10 py-4" type="submit">Save</button>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* Other card and components */}
      </div>
    </div>
  );
}
