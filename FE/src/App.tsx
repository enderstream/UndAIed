import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <Toaster richColors={true} theme="dark" />
      <Outlet />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
