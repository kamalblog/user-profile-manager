import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const AllUsers = lazy(() => import("./pages/AllUsers"));
const GithubRepos = lazy(() => import("./pages/GithubRepos"));

export default function App() {
  return (
    <BrowserRouter>
      {/* 🌀 Suspense fallback: shown while lazy components load */}
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            ⏳ Loading page...
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/github" element={<GithubRepos />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
            <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20%",
                  fontSize: "20px",
                }}
              >
                🚫 404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
