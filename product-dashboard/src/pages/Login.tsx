import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "../lib/api-client"
import { authStore } from "../stores/auth.store"
import { useNavigate } from "react-router-dom"
import { User, Lock } from "lucide-react"

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3)
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const response = await api.post("/auth/login", {
      ...data,
      expiresInMins: 1
    })

    authStore.getState().setTokens(
      response.data.accessToken,
      response.data.refreshToken
    )

    navigate("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96 border border-purple-100"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Username */}
        <div className="relative mb-4">
          <User
            size={18}
            className="absolute left-3 top-3.5 text-purple-500"
          />
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        {errors.username && (
          <p className="text-red-500 text-sm mb-2">
            {errors.username.message}
          </p>
        )}

        {/* Password */}
        <div className="relative mt-4 mb-4">
          <Lock
            size={18}
            className="absolute left-3 top-3.5 text-purple-500"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 active:scale-[0.98] transition font-medium shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  )
}
