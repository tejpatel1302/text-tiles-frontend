import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useLocation } from "react-router-dom"

const FormSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

export function DatePickerForm({ setStartDate, setEndDate, onApply }: { setStartDate: (date: Date | null) => void, setEndDate: (date: Date | null) => void, onApply: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
const location = useLocation()
const isUser = location.pathname === "/user/order-history";
const isSuperAdminOrders = location.pathname === "/super-admin/orders";
const isAdminOrders = location.pathname === "/admin/orders";
const isSAOrderReport = location.pathname === "/super-admin/order-report";
const isAdminOrderReport = location.pathname === "/admin/order-report";
const isUserOrderReport = location.pathname === "/user/order-report";
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setStartDate(data.startDate ?? null);
    setEndDate(data.endDate ?? null);
    onApply();
    toast({
      title: "Date range applied:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{`From: ${data.startDate ? format(data.startDate, "PPP") : "Not set"}, To: ${data.endDate ? format(data.endDate, "PPP") : "Not set"}`}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-5">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>From:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-gray-200",
                        !field.value && "text-gray-500"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date || undefined)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>To:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-gray-200",
                        !field.value && "text-gray-500"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date || undefined)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"  variant={
                          isUser || isUserOrderReport
                            ? "purple"
                            : isAdminOrders || isAdminOrderReport
                            ? "skyblue"
                            : isSuperAdminOrders || isSAOrderReport
                            ? "red"
                            : "default"
                        }
                      >Apply</Button>
      </form>
    </Form>
  )
}