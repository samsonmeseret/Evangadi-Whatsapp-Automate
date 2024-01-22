import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const ProtectRoute = ({ children, redirect }) => {
  const [{ user }, dispatch] = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return <div>{children}</div>;
};

export default ProtectRoute;
