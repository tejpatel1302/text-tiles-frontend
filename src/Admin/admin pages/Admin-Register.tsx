import Register from '@/components/common/Register-form'


const AdminRegister = () => {
  return (
    <div className="z-10 absolute left-[20%]">
        <Register redirect={'/admin/login'}/>
    </div>
  )
}

export default AdminRegister