'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";






const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export function ComboboxForm({heading,subheading, data}:any) {
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="texl-2xl text-black">{heading}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? data.find(
                            (data:any) => data.id === field.value
                          )?.name
                        : `${subheading}`}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList    >
                      <CommandGroup>
                        {/* Ensure languages array is defined before mapping */}
                        {data?.map((data:any) => (
                          <CommandItem
                            value={data?.id}
                            key={data.id}
                            
                            onSelect={() => {
                              form.setValue("language", data.id);
                           
                            }}
                          >
                            {data?.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                data.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                              
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
