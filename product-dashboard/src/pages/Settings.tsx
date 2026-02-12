import { useState, useEffect } from "react"

export default function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "purple"
  )

  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const themeOptions = [
    { name: "Purple", value: "purple", color: "bg-purple-600" },
    { name: "Indigo", value: "indigo", color: "bg-indigo-600" },
    { name: "Emerald", value: "emerald", color: "bg-emerald-600" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Customize your application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Theme Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-b-4 border-purple-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Theme Color
          </h3>

          <div className="flex gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                  theme === option.value
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${option.color}`}
                />
                <span className="text-sm font-medium text-gray-700">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-b-4 border-indigo-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Enable Email Notifications
            </span>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  notifications ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-b-4 border-emerald-600 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mt-6">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
