import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Scanner from "./pages/Scanner";
import Diary from "./pages/Diary";
import Analytics from "./pages/admin/Analytics";
import Logs from "./pages/admin/Logs";
import FoodScans from "./pages/FoodScans";
import StrugglingAreas from "./pages/admin/StrugglingAreas";
import FamilyRelationshipManager from "./pages/admin/FamilyRelationship";
import UserManagement from "./pages/admin/UserManagement";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthLayout
              tagline={
                <>
                  Scan wise. <br /> Eat well. <br /> Feel better.
                </>
              }
            />
          }
        >
          <Route index element={<Login />} />
        </Route>
        <Route
          path="/register"
          element={
            <AuthLayout
              tagline={
                <>
                  Know What <br /> You Eat. <br /> Feel the <br /> Difference.
                </>
              }
            />
          }
        >
          <Route index element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<Scanner />} />
          <Route path="food-scans" element={<FoodScans />} />
          <Route path="diary" element={<Diary />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="family" element={<FamilyRelationshipManager />} />
          <Route path="struggling-areas" element={<StrugglingAreas />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="logs" element={<Logs />} />

          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
