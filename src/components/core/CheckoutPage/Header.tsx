
import { cn } from "@/lib/utils";



interface HeaderProps{
    label: string;
}
const Header = ({label}:HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 ">
        <p className="text-muted-foreground text-2xl font-bold">
            {label}
        </p>
    </div>
  )
}

export default Header