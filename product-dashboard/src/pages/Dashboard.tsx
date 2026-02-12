import { useQuery } from "@tanstack/react-query"
import { Package, Users, AlertTriangle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  
} from "recharts"
import api from "../lib/api-client"

export default function Dashboard() {
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: async () => {
      const res = await api.get("/products?limit=100")
      return res.data
    }
  })

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: async () => {
      const res = await api.get("/users?limit=100")
      return res.data
    }
  })

  const totalProducts = productsData?.total || 0
  const totalUsers = usersData?.total || 0

  const lowStock =
    productsData?.products?.filter((p: any) => p.stock < 10).length || 0

  

  const isLoading = productsLoading || usersLoading

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      border: "border-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      border: "border-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      border: "border-rose-500",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500"
    }
  ]

  const categoryData =
    productsData?.products?.reduce((acc: any, product: any) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {}) || {}

  const categoryChartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key]
  }))

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your platform statistics
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        {cards.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 border border-gray-100 border-b-4 ${item.border}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-gray-600">
                    {item.title}
                  </p>

                  {isLoading ? (
                    <div className="h-9 w-24 bg-gray-200 animate-pulse rounded mt-3"></div>
                  ) : (
                    <h2 className="text-3xl font-semibold mt-3 text-gray-900">
                      {item.value}
                    </h2>
                  )}
                </div>

                <div className={`p-3 rounded-xl ${item.iconBg}`}>
                  <Icon size={22} className={item.iconColor} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

     
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-10">

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">
            Products by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryChartData.map((_, index) => (
                  <Cell key={index} fill="#6366f1" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

