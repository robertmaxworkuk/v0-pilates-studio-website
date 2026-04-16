import { ReactNode } from "react"
import Link from "next/link"

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center flex-row">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Pilatta Studio
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/profile" className="transition-colors hover:text-foreground/80 text-foreground/60">Профиль</Link>
              <Link href="/schedule" className="transition-colors hover:text-foreground/80 text-foreground/60">Расписание</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
