import React, { createContext, useState, useCallback } from "react";
import { createUser, loginUserApi, resetPasswordApi } from "../util/userUtil";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, loggedIn: false });

  const [isLoading, setIsLoading] = useState(false);

  const getLoggedIn = useCallback(async () => {}, []);

  const loginUser = async ({ email, password }) => {
    setIsLoading(true);

    const { success, data, error } = await loginUserApi(email, password);
    if (success) {
      setAuth({
        user: data.user,
        loggedIn: data.loggedIn,
      });
    } else {
      console.error("Error in logging in:", error);
    }

    setIsLoading(false);
    return { success, error };
  };

  const logoutUser = useCallback(async () => {}, []);

  const registerUser = async ({ email, username, password }) => {
    // while loading we set isLoading to true so that we can show
    // loading progress bar or icon
    setIsLoading(true);

    const { success, data, error } = await createUser(
      email,
      username,
      password
    );
    if (success) {
      // here we need to set needed (global) store data
      console.log("fetched:", data);
      setAuth({
        user: data.user,
        loggedIn: data.loggedIn,
      });
    } else {
      // on error, we need 1 general popup for errors handling
      console.error("Error in fetching users:", error);
    }
    // when loading is complete setting isLoading to false and removing progress bar or icon
    setIsLoading(false);
    return { success, error };
  };

  const resetPassword = async (email) => {
    setIsLoading(true);

    const { success, error } = await resetPasswordApi(email);
    if (!success) {
      console.error("Error in resetting password:", error);
    }

    setIsLoading(false);
    return { success, error };
  };

  const getUserName = useCallback(() => {}, []);

  const updateUserName = useCallback(async () => {}, []);

  const updateEmail = useCallback(async () => {}, []);

  const updatePassword = useCallback(async () => {}, []);

  const deleteAccount = useCallback(async () => {}, []);

  const updateAvatar = useCallback(async () => {}, []);

  const updateToken = useCallback(async () => {}, []);

  // Auth context value that will be provided to components
  const authContextValue = {
    auth,
    isLoading,
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
