import React, { createContext, useState, useContext, useCallback } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, loggedIn: false });

  const getLoggedIn = useCallback(async () => {}, []);

  const loginUser = useCallback(async (userData) => {}, []);

  const logoutUser = useCallback(async () => {}, []);

  const registerUser = useCallback(async (userData) => {}, []);

  const getUserName = useCallback(() => {}, [auth]);

  const resetPassword = useCallback(async () => {}, []);

  const updateUserName = useCallback(async () => {}, []);

  const updateEmail = useCallback(async () => {}, []);

  const updatePassword = useCallback(async () => {}, []);

  const deleteAccount = useCallback(async () => {}, []);

  const updateAvatar = useCallback(async () => {}, []);

  const updateToken = useCallback(async () => {}, []);

  // Auth context value that will be provided to components
  const authContextValue = {
    auth,
    getLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getUserName,
    resetPassword,
    updateUserName,
    updateEmail,
    updatePassword,
    deleteAccount,
    updateAvatar,
    updateToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
