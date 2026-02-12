import Sidebar from "./Sidebar"
import Header from "./Header"
import { useState } from "react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  )
}
