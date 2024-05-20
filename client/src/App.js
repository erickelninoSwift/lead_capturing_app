import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Login from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const Authtoken = cookies.AuthToken;

  function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={Authtoken ? <AdminPage /> : <LeadCaputing />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
