import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface BackButtonProps{
    label:string,
    href: string
}

const BackButton = ({label,href}: BackButtonProps) => {
  const part2 = label.split("?")[1]
  return (
    <Button>
        <Link to={href}>
          <span className="text-purple-200">{part2}</span>
        </Link>
    </Button>
  )
}

export default BackButton