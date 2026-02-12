import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../lib/api-client"

export default function Products() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit, debouncedSearch],
    queryFn: async () => {
      const skip = (page - 1) * limit
      const res = await api.get(
        `/products/search?q=${debouncedSearch}&limit=${limit}&skip=${skip}`
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
            Products
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor your inventory
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 border-b-4 border-purple-600 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">

            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Stock</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {/* Skeleton */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-lg" />
                        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full" />
                    </td>
                  </tr>
                ))}

              {/* Error */}
              {!isLoading && error && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-red-500">
                    Failed to load products.
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!isLoading && !error && data?.products?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!isLoading && !error &&
                data?.products?.map((product: any) => (
                  <tr
                    key={product.id}
                    className="hover:bg-purple-50 transition duration-200"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.thumbnail}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <span className="font-medium text-gray-900">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-600 capitalize">
                      {product.category}
                    </td>

                    <td className="px-6 py-5 font-semibold text-gray-900">
                      ${product.price}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          product.stock < 10
                            ? "bg-rose-100 text-rose-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {product.stock}
                      </span>
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
    </div>
  )
}
