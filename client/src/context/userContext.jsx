import React, { createContext, useContext, useReducer } from "react";
const UserContext = createContext();

const UserContextProvider = ({ initialState, reducer, children }) => {
  return (
    <UserContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
