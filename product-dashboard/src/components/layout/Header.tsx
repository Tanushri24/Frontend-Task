import { authStore } from "../../stores/auth.store"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { Search, User, LogOut, Menu } from "lucide-react"

export default function Header({ setSidebarOpen }: any) {
  const logout = authStore((state) => state.logout)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white px-4 lg:px-8 py-4 flex justify-between items-center border-b border-gray-100 shadow-sm">

      {/* Mobile View */}
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h1>
      </div>

      {/* Desktop Title */}
      <h1 className="hidden lg:block text-xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4 lg:gap-6">

        {/* Search (Hide on small screens) */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition"
          >
            <User size={18} className="text-purple-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
