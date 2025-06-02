// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/routes";
// import { RecoilRoot } from "recoil";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")!).render(
//   // <StrictMode>
//   <RecoilRoot>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   </RecoilRoot>
//   // </StrictMode>,
// );

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./components/SocketContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <SocketProvider url="https://www.undaied.com">
        <RouterProvider router={router} />
      </SocketProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  // </StrictMode>,
);
