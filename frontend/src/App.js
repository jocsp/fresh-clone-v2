import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import SingleTicket from "./pages/SingleTicket";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";

function App() {
  const { agent } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={!agent ? <Login /> : <Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={agent ? <Dashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/tickets"
              element={agent ? <Tickets /> : <Navigate to="/login" />}
            />

            <Route
              path="/ticket/:ticket_number"
              element={agent ? <SingleTicket /> : <Navigate to="/login" />}
            />

            <Route
              path="/tickets/new"
              element={agent ? <NewTicket /> : <Navigate to="/login" />}
            />

            <Route
              path="/contact/:contactId"
              element={agent ? <ContactPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
