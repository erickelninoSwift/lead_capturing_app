import React from "react";
import UserTable from "../components/UserTable";

const AdminPage = () => {
  return (
    <div className="flex justify-center items-center mt-[10px] h-[700px] w-screen items-center overflow-hidden px-2">
      <UserTable />
    </div>
  );
};

export default AdminPage;
