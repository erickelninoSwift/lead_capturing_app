import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Login from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";

function App() {
  const [Authtoken, setAuthtoken] = useState(null);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={Authtoken ? <AdminPage /> : <LeadCaputing />}
        />
        <Route path="/login" element={<Login tokenAdd={setAuthtoken} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
