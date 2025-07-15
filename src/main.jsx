import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from './routes/Routes'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider'
import { MembershipProvider } from './provider/MembershipProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MembershipProvider>
          <RouterProvider router={Routes} />
        </MembershipProvider>

      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
