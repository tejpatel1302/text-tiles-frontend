import Login from "@/components/core/LoginPages/Login"


const AdminLogin = () => {
  return (
    <div className="z-10 absolute left-[20%]">
      <Login redirect={"/admin/orders"}/>
      </div>
  )
}

export default AdminLogin