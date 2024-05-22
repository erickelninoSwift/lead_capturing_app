import "./App.css";
import Login from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";

import AdminPage from "./pages/AdminPage";
import { useCookies } from "react-cookie";
import Applayout from "./pages/Applayout";
function App() {
  const [cookies] = useCookies(null);
  const Authtoken = cookies.AuthToken;
  return (
    <>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={Authtoken ? <AdminPage /> : <LeadCaputing />} />
          <Route path="/login" element={!Authtoken && <Login />} />
          <Route path="/admin" element={Authtoken && <AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
