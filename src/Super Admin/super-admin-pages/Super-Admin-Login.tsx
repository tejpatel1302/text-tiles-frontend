import Login from "@/components/core/LoginPages/Login"



const SuperAdminLogin = () => {
  return (
    <div className="z-10 absolute left-[20%]">
        <Login redirect={'/super-admin/orders'}/>
    </div>
  )
}

export default SuperAdminLogin