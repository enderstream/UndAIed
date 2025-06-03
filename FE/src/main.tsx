import { createRoot } from 'react-dom/client'
import '@/globals.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/routes/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketProvider } from '@/components/SocketContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <SocketProvider url='https://www.undaied.com'> */}
    <RouterProvider router={router} />
    {/* </SocketProvider> */}
  </QueryClientProvider>
)
