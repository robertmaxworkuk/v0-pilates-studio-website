"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { ThemePreference } from "@/lib/actions/user"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const supabase = React.useMemo(() => createClient(), [])

  const applyTheme = (value: ThemePreference) => {
    setTheme(value)
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from("users_profile")
        .update({ theme_preference: value })
        .eq("id", user.id)
    })()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="group rounded-full w-9 h-9 border border-border/50 bg-background/50 hover:bg-muted/50">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-primary" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-primary" />
          <span className="sr-only">Сменить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => applyTheme("light")}>
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("dark")}>
          Темная
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("system")}>
          Как в системе
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
