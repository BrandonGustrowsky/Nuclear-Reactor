import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Reactor } from "./routes/Reactor"
import App from './App'
import './index.css'

const router = createBrowserRouter([
    {
      path: "/reactor/:id",
      element: <Reactor />,
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
