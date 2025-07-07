import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import AuthProvider from './contexts/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import AddArtifacts from './pages/AddArtifacts.jsx';
import AllArtifacts from './pages/AllArtifacts.jsx';
import LikedArtifacts from './pages/LikedArtifacts.jsx';
import MyArtifacts from './pages/MyArtifacts.jsx';
import ArtifactDetails from './pages/ArtifactDetails.jsx';
import UpdateArtifact from './pages/UpdateArtifact.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch('http://localhost:3000/allartifacts_top6'),
        Component: HomePage
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/addartifacts",
        element: <PrivateRoute><AddArtifacts></AddArtifacts></PrivateRoute>
      },
      {
        path: "/allartifacts",
        loader: () => fetch('http://localhost:3000/allartifacts'),
        element: <PrivateRoute><AllArtifacts></AllArtifacts></PrivateRoute>
      },
      {
        path: "/likedartifacts",
        element: <PrivateRoute><LikedArtifacts></LikedArtifacts></PrivateRoute>
      },
      {
        path: "/myartifacts",
        element: <PrivateRoute><MyArtifacts></MyArtifacts></PrivateRoute>
      },
      {
        path: "/artifactdetails/:id",
        element: <PrivateRoute><ArtifactDetails></ArtifactDetails></PrivateRoute>
      },
      {
        path: "/updateartifact/:id",
        element: <PrivateRoute><UpdateArtifact></UpdateArtifact></PrivateRoute>
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)

