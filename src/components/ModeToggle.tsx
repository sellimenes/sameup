import { useTheme } from "@/components/theme-provider"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" className="bg-transparent" onClick={() => theme === "light" ? setTheme('dark') : setTheme('light')}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  )
}
