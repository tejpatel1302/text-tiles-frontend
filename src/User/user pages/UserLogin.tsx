import Login from "@/components/core/LoginPages/Login"



const UserLogin = () => {
  return (
    <div className="z-10 absolute left-[20%]">
        <Login redirect={'/user/category'}/>
    </div>
  )
}

export default UserLogin