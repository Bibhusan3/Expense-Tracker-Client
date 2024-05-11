import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing CSS styles
import { createRoot } from "react-dom/client"; // Importing createRoot function for rendering
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"; // Importing routing components from react-router-dom
import Dashborad from "./Pages/Dashboard.jsx"; // Importing the Dashboard component
import Learningresource from './Pages/Learningresource.jsx'; // Importing the Learningresource component
import LoginPage from './Pages/LoginPage.jsx'; // Importing the LoginPage component
import RegisterPage from './Pages/RegisterPage.jsx'; // Importing the RegisterPage component
// import Useredit from './Pages/Useredit.jsx'; // Importing the Useredit component

import { ContextProvider } from './context/ContextProvider.jsx';

// Creating the browser router with specified routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Dashborad />
  },
  {
    path: "/Learningresource",
    element: <Learningresource />
  },
  {
    path: "/LoginPage",
    element: <LoginPage />
  },
  {
    path: "/RegisterPage",
    element: <RegisterPage />
  },
  // {
  //   path: "/Useredit",
  //   element: <Useredit />
  // },
]);

// Rendering the router wrapped in RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
