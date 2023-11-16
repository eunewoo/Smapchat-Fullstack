import React, { createContext, useState, useCallback } from "react";
import { getUsers } from "../util/userUtil";

export const GlobalStoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [store] = useState({
    //storing all information
  });

  // call all of the functions here
  const handleFetchUsers = async () => {
    let errorMessage;
    try {
      const { success, data } = await getUsers();
    } catch (e) {
      throw new Error(errorMessage);
    }
  };

  const contextData = {
    handleFetchUsers,
  };

  return (
    <GlobalStoreContext.Provider value={contextData}>
      {children}
    </GlobalStoreContext.Provider>
  );
};
