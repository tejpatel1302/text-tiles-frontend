import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


const Accordian = ({description,material}:any) => {
  return (
    <div>
        <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Product Details</AccordionTrigger>
    <AccordionContent>
    {description}
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Material Composition</AccordionTrigger>
    <AccordionContent>
      {material}
    </AccordionContent>
  </AccordionItem>
 
</Accordion>

    </div>
  )
}

export default Accordian  