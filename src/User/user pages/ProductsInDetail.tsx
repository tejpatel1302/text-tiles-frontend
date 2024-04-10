import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './Card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import Accordian from '@/components/common/Accordian'
import UserWebsite from './UserWebsite'

const ProductInDetail = () => {
   const [product, setProduct]:any = useState(null)
   const params = useParams()
   const { productId } = params

   const fetchData = async () => {
      const data = await fetch(`https://64cc9ddf2eafdcdc851a0938.mockapi.io/EcomProducts/${productId}`)
      const json = await data.json()
      setProduct(json)
   }

   useEffect(() => {
      fetchData()
   }, [params])

   return (
      <div>
        <div className='flex justify-center items-center w-10/12 mx-auto py-8'>
         {product && (
            <div className='flex gap-8'>
               <div className='border border-gray-300 h-[450px] w-[400px] rounded-lg overflow-hidden flex justify-center items-center'>
                  <img src={product?.image} alt={product?.title} className='h-96' />
               </div>
               <div className='flex flex-col justify-center max-w-[500px]'>
                  <h2 className='text-3xl font-semibold mb-4 '>{product?.title}</h2>
                  <div className='text-xl mb-4 '>Price: ${product?.price}</div>
                  <div className='mb-4'>
                     <div className='mb-2'>Colors</div>
                     <div className='flex gap-3'>
                        <div className='h-6 w-6 bg-red-500 rounded-full'></div>
                        <div className='h-6 w-6 bg-green-500 rounded-full'></div>
                        <div className='h-6 w-6 bg-blue-500 rounded-full'></div>
                        <div className='h-6 w-6 bg-yellow-500 rounded-full'></div>
                        <div className='h-6 w-6 bg-gray-500 rounded-full'></div>
                        <div className='h-6 w-6 bg-purple-500 rounded-full'></div>
                     </div>
                  </div>
                  <div className='mb-4'>
                     <div className='mb-2'>Sizes</div>
                     <select name='sizes' id='sizes' className='w-96 p-2 border border-gray-300 rounded-md'>
                        <option value=''>Category 1</option>
                        <option value=''>Category 2</option>
                        <option value=''>Category 3</option>
                     </select>
                  </div>
                  <div className='flex gap-4'>
                     <Button variant='purple'>Add to Cart</Button>
                     <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400'>
                        <Heart className='h-6 w-6 text-gray-600' />
                     </div>
                  </div>
                  <div className='w-96'>
                    <Accordian/>
                  </div>
               </div>
            </div>
         )}
        
      </div>
      <div className=' mx-auto'>
        
         <div>
            <UserWebsite/>
         </div>
      </div>
      </div>
   )
}

export default ProductInDetail
