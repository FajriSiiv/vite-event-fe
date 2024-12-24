import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventDetail from "./pages/event/eventDetail";
import AdminPage from "./pages/admin/admin";
import EventAdmin from "./pages/admin/event/EventAdmin";
import CreateEvent from "./pages/admin/event/CreateEvent";
import Layout from "./layout";
import AdminRoute from "./auth/AdminRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFoundPage from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/event/:id" element={<EventAdmin />} />
          <Route path="/admin/event/create" element={<CreateEvent />} />
        </Route>

        <Route path="/event/:id" element={<EventDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
