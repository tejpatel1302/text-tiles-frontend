import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { EyeIcon } from 'lucide-react';

const ImageColorDialog = ({colorRelation}:any) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const toggleImage = (image: any) => {
        setSelectedImage(image);
      };
  return (
    <div>     <Dialog >
    <DialogTrigger > <EyeIcon /></DialogTrigger>
    <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-auto overflow-x-hidden">
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription>

        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-col items-center'>
      <div className='flex gap-48 mb-10'>
        <div className='text-2xl font-bold'>Image</div>
        <div className='text-2xl font-bold'>Color</div>
      </div>
     {colorRelation?.map((colorRel: any, index: number) => (
       <div  key={index}>
         {/* <EyeIcon onClick={() => toggleImage(colorRel?.image?.buffer)} /> */}
       <div className='flex gap-36 w-full mb-10'>
       <>
       {colorRel?.image?.buffer && (
           <img src={`data:image/jpeg;base64,${colorRel.image.buffer}`} alt="Product" style={{ width: 400, height: 200 }} />
         )}
       </>
         <div>
        <div className='flex items-center justify-center mr-48 text-2xl h-full'>
        {colorRel?.color?.name && (
           <div>
            {colorRel?.color?.name}
           </div>
         )}
        </div>
         </div>
       </div>
       </div>
     ))}
   </div>
  
      <DialogFooter>
        {/* <Button type="submit" variant={'green'} onClick={handle}>Save changes</Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog></div>
  )
}

export default ImageColorDialog