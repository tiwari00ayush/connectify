import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  AuthLayout,
  RootLayout,
  Explore,
  CreatePost,
  Profile,
  EditProfile,
  SavedPost,
  People,
} from "./pages";
import { AuthContextProvider } from "./context/AuthContext";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route path="" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="createPost" element={<CreatePost />} />
        <Route path="saved" element={<SavedPost />} />
        <Route path="profile/:uid" element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="people" element={<People />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
