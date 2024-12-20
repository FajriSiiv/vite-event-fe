import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventDetail from "./pages/event/eventDetail";
import AdminPage from "./pages/admin/admin";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/event/:id" element={<EventDetail />} />
    </Routes>
  );
}

export default App;
