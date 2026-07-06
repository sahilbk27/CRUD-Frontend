import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CreateOrder from "./pages/CreateOrder";
import ViewOrders from "./pages/ViewOrders";
import EditOrder from "./pages/EditOrder";
import Login from "./pages/Login";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/create"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/view"
          element={
            <ProtectedRoute>
              <ViewOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/edit/:id"
          element={
            <ProtectedRoute>
              <EditOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
