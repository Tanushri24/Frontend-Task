import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import Layout from "../components/layout/Layout"
import Products from "../pages/Products"
import Users from "../pages/Users"
import Settings from "../pages/Settings"

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  </BrowserRouter>
)

export default AppRoutes
