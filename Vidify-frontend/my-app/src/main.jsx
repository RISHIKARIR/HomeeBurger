import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AuthProvider from "./context/authcontext.jsx";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient;

createRoot(document.getElementById("root")).render(
  <>

  <QueryClientProvider client={queryclient}> 
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <App />
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  </>,
);
