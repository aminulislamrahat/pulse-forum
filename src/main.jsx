import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from './routes/Routes'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider'
import { MembershipProvider } from './provider/MembershipProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MembershipProvider>
        <RouterProvider router={Routes} />
      </MembershipProvider>

    </AuthProvider>
  </StrictMode>,
)
