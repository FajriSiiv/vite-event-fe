import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventDetail from "./pages/event/eventDetail";
import AdminPage from "./pages/admin/admin";
import EventAdmin from "./pages/admin/event/EventAdmin";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateEvent from "./pages/admin/event/CreateEvent";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/admin/event/:id" element={<EventAdmin />} />
        <Route path="/admin/event/create" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
