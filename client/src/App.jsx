import React, { useState, useEffect } from "react";
import Router from "./Router";
import { auth } from "./utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "./context/userContext";

const App = () => {
  const [{}, dispatch] = useUserContext();
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    setIsLoadingUser(true);
    onAuthStateChanged(auth, (user) => {
      setIsLoadingUser(false);
      if (user) {
        // console.log(user);
        dispatch({ type: "SAVE_USER", payload: user });
      } else {
        setIsLoadingUser(false);
        dispatch({ type: "SAVE_USER", payload: null });
      }
    });
  }, []);

  return <Router isLoadingUser={isLoadingUser} />;
};

export default App;
