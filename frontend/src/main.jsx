import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import router from './routes/Route.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
    <App />
    <Toaster position="bottom-center" duration={500} />
  </StrictMode>,
)
