import { NavLink } from "react-router-dom"
import { LayoutDashboard, Package, Users, Settings, X } from "lucide-react"

export default function Sidebar({ open, setOpen }: any) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-100 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Admin Panel
          </h2>
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/products" icon={<Package size={18} />} label="Products" />
          <NavItem to="/users" icon={<Users size={18} />} label="Users" />
          <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>
    </>
  )
}

function NavItem({ to, icon, label }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
        ${
          isActive
            ? "bg-purple-600 text-white shadow-md"
            : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
