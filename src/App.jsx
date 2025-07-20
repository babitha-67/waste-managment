// src/App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import PickupRequest from "./pages/User/PickupRequest";
import PickupStatus from "./pages/User/PickupStatus";
import RaiseComplaint from "./pages/User/RaiseComplaint";
import ComplaintHistory from "./pages/User/ComplaintHistory";
import EditProfile from "./pages/User/EditProfile";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminMetrics from "./pages/Admin/AdminMetrics";
import AssignPickup from "./pages/Admin/AssignPickup";
import ViewComplaints from "./pages/Admin/ViewComplaints";
import UserDashboard from "./pages/User/UserDashboard";
import DriverDashboard from "./pages/Driver/DriverDashboard";
import AssignedPickups from "./pages/Driver/AssignedPickups";
import DriverPickupHistory from "./pages/Driver/DriverPickupHistory";
import DriverEditProfile from "./pages/Driver/DriverEditProfile";
import HomePage from "./pages/HomePage";
import AdminPickupStatus from "./pages/Admin/AdminPickupStatus";
import AdminSendAlert from "./pages/Admin/AdminSendAlert";
import EmailNotification from "./pages/Admin/EmailNotification";
import Layout from "./components/Layout";
import { AuthContext } from "./authprovider";


function App() {
  const { user, authLoading } = useContext(AuthContext); // <-- get from context

  if (authLoading) {
    // Show a loading spinner or message while auth state is loading
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        
        {/* User Routes (Protected) */}
        {user?.role === "user" && (
          <>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/pickup" element={<PickupRequest />} />
            <Route path="/user/status" element={<PickupStatus />} />
            <Route path="/user/complaint" element={<RaiseComplaint />} />
            <Route path="/user/complaints" element={<ComplaintHistory />} />
            <Route path="/user/profile" element={<EditProfile />} />
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/metrics" element={<AdminMetrics />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/assign-pickups" element={<AssignPickup />} />
            <Route path="/admin/pickup-status" element={<AdminPickupStatus />} />
            <Route path="/admin/complaints" element={<ViewComplaints />} />
            <Route path="/admin/alerts" element={<AdminSendAlert />} />
            <Route path="/admin/send-email" element={<EmailNotification />} />
            
          </>
        )}

        {user?.role === "driver" && (
          <>
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/driver/pickups" element={<AssignedPickups/>} />
            <Route path="/driver/history" element={<DriverPickupHistory />} />
            <Route path="/driver/profile" element={<DriverEditProfile />} />

          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Route> 
      </Routes>
    </Router>
  );
}

export default App;