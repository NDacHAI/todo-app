import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./context/UserContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "router.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </UserProvider>
  </StrictMode>
);
