import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePledge from "./pages/CreatePledge.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import CreateFundraiserForm from "./components/CreateFundraiserForm.jsx";
import CreatePledgeForm from "./components/CreatePledgeForm.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar/>,
      children: [
          { path: "/", element: <HomePage/> },
          { path: "/login", element: <LoginPage/> },
          { path: "/CreateFundraiser", element: <CreateFundraiserForm/>},
          { path: "/fundraiser/:id", element: <FundraiserPage /> },
          { path: "/fundraiser/:id/pledge", element: <CreatePledge /> },
          { path: "/about", element: <About /> },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);
