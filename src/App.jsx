import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";
import Footer from "./pages/Footer"

import { Provider } from "react-redux";
import store from "./store";
import { JobsProvider } from "./context/JobsContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <JobsProvider>
          <Router>
            <ScrollToTop /> 
            <Navbar />
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/job/:id" element={<JobDetails />} />

             <Route
               path="/dashboard"
               element={
             <ProtectedRoute allowedRoles={["user"]}>
             <UserDashboard />
            </ProtectedRoute>
             }
             />

        <Route
         path="/admin-dashboard"
        element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
        </ProtectedRoute>
          }
          />

      
              <Route
                path="/post-job"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer/>
          </Router>
        </JobsProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
 

