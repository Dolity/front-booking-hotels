import React from 'react'
import ReactDOM from 'react-dom/client'
import Book from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import NotFoundPage from './page/notFoundPage.jsx'
import "./index.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/book',
    element: <Book />
  },
  {
    path: '/register',
    element: <Register />
  },
  {   path: '/login',
    element: <Login />
  },
  {
    path: '/*',
    element: <NotFoundPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
