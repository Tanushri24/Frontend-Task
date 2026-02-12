import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../lib/api-client"

export default function Users() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, limit, debouncedSearch],
    queryFn: async () => {
      const skip = (page - 1) * limit
      const res = await api.get(
        `/users/search?q=${debouncedSearch}&limit=${limit}&skip=${skip}`
      )
      return res.data
    }
  })

  const totalPages = Math.ceil((data?.total || 0) / limit)

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Users
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor registered users
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 border-b-4 border-indigo-600 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Phone</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {/* Skeleton */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
                    </td>
                  </tr>
                ))}

              {/* Error */}
              {!isLoading && error && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-red-500">
                    Failed to load users.
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!isLoading && !error && data?.users?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}

              {/* Data */}
              {!isLoading && !error &&
                data?.users?.map((user: any) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-indigo-50 transition duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.image}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {user.phone}
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4 border-t border-gray-100">

          <div className="text-sm text-gray-500">
            Showing page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">
              User Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
