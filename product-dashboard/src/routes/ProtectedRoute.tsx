import { Navigate } from "react-router-dom"
import { authStore } from "../stores/auth.store"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = authStore((state) => state.accessToken)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
