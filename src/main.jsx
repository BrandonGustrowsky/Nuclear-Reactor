import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Reactor from "./routes/Reactor"
import Dashboard from "./routes/Dashboard"
import { SnackbarProvider } from "notistack"
import App from './App'
import './index.css'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/reactor/:id",
      element: <Reactor />,
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
)
