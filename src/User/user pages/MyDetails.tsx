import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { getUserApi, updateMyDetailsApi } from "@/features/api/apicall";
import { UpdateUserDetailsSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardHeader, CardTitle, TableCard } from "@/components/common/TableCard";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function MyDetails() {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
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

  const fetchUserData = async () => {
    try {
      const headers = { Authorization: `Bearer ${cookie.auth}` };
      const res = await getUserApi(headers);
      setEditedUser(res?.data);
      return res?.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user details");
    }
  };

  const { isLoading, data: AccountDetailsData } = useQuery({
    queryKey: ["accountDetailsData"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch data on component mount

  const updateAccountDetails = async (req: any) => {
    try {
      const payload = { Authorization: `Bearer ${cookie.auth}` };
      const res = await updateMyDetailsApi(payload, req);
      toast.success("User details updated successfully");
      setEditMode(false);
      return res;
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user details");
    }
  };

  const onUpdateSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["accountDetailsData"] });
  };

  const onRequestError = () => {
    toast("Error");
  };

  const updateMutation = useMutation({
    mutationFn: updateAccountDetails,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  const submitData = async (data: any) => {
    const dobISOString = new Date(data.dob).toISOString();
    const req = {
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ")[1],
      email: data.email,
      phoneNum: data.phoneNum,
      dob: dobISOString,
    };
    updateMutation.mutate({ ...req });
  };

  function convertDateFormat(dateString: any) {
    if (!dateString) return "";
    const datePart = dateString.split("T")[0];
    return datePart;
  }

  return (
    <TableCard className="h-screen overflow-y-hidden ">
      <Toaster />
      <CardHeader>
        <CardTitle className="font-bold ml-4 text-3xl">Your Account Details</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center mt-[40px] ">
        {isLoading && <span>Loading</span>}
        {!isLoading && (
          <form {...form} onSubmit={form.handleSubmit(submitData)} className="space-y-4 flex gap-4">
            <div className="border border-[#7346da] h-96 flex flex-col  rounded-lg justify-center p-10 gap-14  w-[500px]">
              <div className="space-y-2 flex gap-9">
                <label htmlFor="name" className="text-2xl font-semibold mt-1">
                  Name:
                </label>
                {!editMode ? (
                  <div className="text-xl">{`${AccountDetailsData?.user?.firstName} ${AccountDetailsData?.user?.lastName}`}</div>
                ) : (
                  <input
                    id="name"
                    {...form.register("name")}
                    defaultValue={`${editedUser?.user?.firstName} ${editedUser?.user?.lastName}`}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        user: { ...editedUser.user, firstName: e.target.value.split(" ")[0], lastName: e.target.value.split(" ")[1] },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
              <div className="space-y-2 flex gap-9">
                <label htmlFor="dob" className="text-2xl font-semibold mt-1">
                  Date of Birth:
                </label>
                {!editMode ? (
                  <div className="text-xl">{convertDateFormat(AccountDetailsData?.user?.dob)}</div>
                ) : (
                  <input
                    id="dob"
                    type="date"
                    {...form.register("dob")}
                    defaultValue={convertDateFormat(editedUser?.user?.dob)}
                    onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, dob: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
              <div className="space-y-2 flex gap-9">
                <label htmlFor="email" className="text-2xl font-semibold mt-1">
                  Email:
                </label>
                {!editMode ? (
                  <div className="text-xl">{AccountDetailsData?.user?.email}</div>
                ) : (
                  <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    defaultValue={editedUser?.user?.email}
                    onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, email: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
            <div className="border border-[#7346da] relative -top-[16px] h-96 flex rounded-lg flex-col  p-10 gap-14  w-[500px]">
              <div className="space-y-2 flex gap-9 mt-12">
                <label htmlFor="gender" className="text-2xl font-semibold mt-1">
                  Gender:
                </label>
                {!editMode ? (
                  <div className="text-xl">{AccountDetailsData?.user?.gender}</div>
                ) : (
                  <select
                    id="gender"
                    {...form.register("gender")}
                    defaultValue={editedUser?.user?.gender}
                    onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, gender: e.target.value } })}
                    className="w-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )}
              </div>
              <div className="space-y-2 flex ">
                <label htmlFor="phoneNum" className="text-2xl font-semibold mt-1">
                  Mobile Number:
                </label>
                {!editMode ? (
                  <div className="text-xl">{AccountDetailsData?.user?.phoneNum}</div>
                ) : (
                  <input
                    id="phoneNum"
                    type="tel"
                    {...form.register("phoneNum")}
                    defaultValue={editedUser?.user?.phoneNum}
                    onChange={(e) => setEditedUser({ ...editedUser, user: { ...editedUser.user, phoneNum: e.target.value } })}
                    className="w-60 px-4 py-2 mr-14 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
            <div className="relative -left-[120px] -top-[100px]">
              {!editMode ? (
                <Button variant={"purple"} className="float-right mr-2 mt-2 px-10 py-4" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              ) : (
                <Button className="float-right mr-2 mt-2 px-10 py-4" type="submit">
                  Save
                </Button>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </TableCard>
  );
}
