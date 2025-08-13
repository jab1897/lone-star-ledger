import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import "./styles/global.css";
import Nav from "./components/Nav";

const qc = new QueryClient();

function Shell(){
  return (
    <>
      <Nav/>
      <RouterProvider router={router}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}><Shell/></QueryClientProvider>
  </React.StrictMode>
);
