import { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r bg-background shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="font-semibold text-lg hover:text-primary transition-colors">
            Pilatta Admin
          </Link>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Дашборд</Link>
          {/* Будущие ссылки */}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
