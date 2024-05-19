import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Applayout from "./pages/Applayout";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";
import Navbar from "./components/Navbar";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LeadCaputing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
