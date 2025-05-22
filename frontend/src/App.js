import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Mobiles from "./pages/Mobiles";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import SingleTicket from "./pages/SingleTicket";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import ContactsPage from "./pages/ContactsPage";
import { useState } from "react";

function App() {
  const { agent } = useAuthContext();
  const [isMobile, setIsMobile] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  useState(()=> {
    // get from the user whether their have acknowledged that the app was developed for screen width of minimum 1000px
    const acknoledgementItem = localStorage.getItem("acknowledgedScreenSize");
    console.log(acknoledgementItem);

    console.log("Screen width: " + window.screen.width);
    console.log("Screen height: " + window.screen.height);
    console.log("Screen orientation: " + window.screen.orientation.type);
    
    if (acknoledgementItem) {
      setHasAcknowledged(true);
      return;
    };

    const screenWidth = window.screen.width;

    setIsMobile(window.screen.width < 1000);
  },[hasAcknowledged])

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
              path="/mobile"
              element={<Mobiles setHasAcknowledged={setHasAcknowledged} />}
            />

            <Route
              path="/dashboard"
              // element={agent ? <Dashboard /> : <Navigate to="/login" />}
              element={isMobile && !hasAcknowledged ? <Navigate to="/mobile" /> : agent ? <Dashboard /> : <Navigate to="/login" />}
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

            <Route
              path="/contacts"
              element={agent ? <ContactsPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
