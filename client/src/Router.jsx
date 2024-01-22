import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Groups from "./pages/Groups/Groups";
import GroupDetail from "./pages/GroupDetail/GroupDetail";
import WhatsApp from "./pages/WhatsApp/WhatsApp";
import io from "socket.io-client";
const socket = io("http://localhost:4040");
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import { useUserContext } from "./context/userContext";

const AppRouter = ({ isLoadingUser }) => {
  const [{ user }, _] = useUserContext();

  useEffect(() => {
    // connect to my realtime express backend only if there is a user
    if (user) {
      socket.on("connect");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/whatsapp"
          element={
            <ProtectRoute redirect={"/whatsapp"}>
              <WhatsApp socket={socket} />
            </ProtectRoute>
          }
        />
        <Route path="/" element={<Auth isLoadingUser={isLoadingUser} />} />
        <Route
          path="/whatsapp/groups"
          element={
            <ProtectRoute redirect={"/whatsapp/groups"}>
              <Groups socket={socket} />
            </ProtectRoute>
          }
        >
          <Route
            path="/whatsapp/groups/:groupId"
            element={
              <ProtectRoute redirect={"/whatsapp/groups"}>
                <GroupDetail socket={socket} />
              </ProtectRoute>
            }
          ></Route>
        </Route>
      </Routes>

      {/* {routes} */}
    </Router>
  );
};

export default AppRouter;
