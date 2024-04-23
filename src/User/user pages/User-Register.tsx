import Register from '@/components/common/Register-form'


const UserRegister = () => {
  return (
    <div className="z-10 absolute left-[20%]">
        <Register redirect={'/user/login'}/>
    </div>
  )
}

export default UserRegister