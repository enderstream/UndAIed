import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <Toaster richColors={true} theme='dark' />
      <Outlet />
    </>
  )
}

export default App
