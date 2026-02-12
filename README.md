# React Admin Dashboard

## 📌 Project Overview

This project is a modern Admin Dashboard built using React + TypeScript.  
It demonstrates authentication handling, protected routing, server state management, pagination, search functionality, and responsive UI design.

The application follows a scalable and modular architecture suitable for production-level frontend applications.

---

## 🚀 Tech Stack

- React (Vite)
- TypeScript
- Zustand (Authentication & Global State)
- TanStack React Query (Server State Management)
- Tailwind CSS (UI Styling)
- Axios (API Client)

---

## ✨ Features

### 🔐 Authentication
- Token-based authentication
- Access & Refresh token storage using Zustand
- Persistent login using localStorage
- Logout functionality (clears tokens and user state)

### 🔒 Protected Routes
- Routes are accessible only when authenticated
- Redirect to login if unauthorized

### 👥 Users Module
- Fetch users from API
- Pagination
- Debounced search
- Loading skeleton state
- Error handling
- Empty state handling
- User detail modal
- Fully responsive layout

### 📦 Products Module
- Fetch product list
- Display product images
- Stock indicator with conditional styling
- Loading state
- Error state
- Responsive table layout

### 🎨 UI/UX
- Clean and modern UI
- Responsive (Mobile + Tablet + Desktop)
- Reusable component structure
- Consistent design system

---

## 🏗 Project Structure

