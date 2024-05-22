import "./App.css";
import Login from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import AdminPage from "./pages/AdminPage";
// import { useCookies } from "react-cookie";
import Applayout from "./pages/Applayout";
function App() {
  const { AuthToken } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={AuthToken ? <AdminPage /> : <LeadCaputing />} />
          <Route path="/login" element={!AuthToken && <Login />} />
          <Route path="/admin" element={AuthToken && <AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
