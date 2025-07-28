import { StrictMode, Suspense } from 'react'
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
        // loader: () => fetch('https://historical-artifacts-tracker-server-one.vercel.app/allartifacts_top6', {credentials : 'include'}),
        loader: async () => {
          try {
            const res = await fetch('https://historical-artifacts-tracker-server-one.vercel.app/allartifacts_top6', {
              credentials: 'include'
            });
            if (!res.ok) {
              throw new Error('Failed to fetch');
            }
            return await res.json();
          } catch (err) {
            console.error(err);
            return null; // 
          }
        },

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
        // loader: () => fetch('https://historical-artifacts-tracker-server-one.vercel.app/allartifacts', { credentials: 'include' }),
        loader: async () => {
          try {
            const res = await fetch('https://historical-artifacts-tracker-server-one.vercel.app/allartifacts', {
              credentials: 'include'
            });
            if (!res.ok) {
              throw new Error('Failed to fetch');
            }
            return await res.json();
          } catch (err) {
            console.error(err);
            return null; // 
          }
        },
        element: <AllArtifacts></AllArtifacts>
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

