import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Groups from "./pages/Groups/Groups";
import GroupDetail from "./pages/GroupDetail/GroupDetail";
import Landing from "./pages/Landing/Landing";
import io from "socket.io-client";
const socket = io("http://localhost:4040");

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />
      </Routes>

      {/* {routes} */}
    </Router>
  );
};

export default AppRouter;
