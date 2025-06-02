import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

const App = () => {
  return (
    <>
      <Toaster richColors theme='dark' position="top-right" />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default App