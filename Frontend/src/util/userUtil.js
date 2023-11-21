import { webFetch, webDelete, webPost, webPut } from "./webUtil";

/// Fetches a users profile as a JSON object based on a
/// provided e-mail address
export async function userProfile(email) {
  return await webFetch(`/User/${email}`);
}

export async function getUsers() {
  try {
    const response = await webFetch(`/Users`);
    return { success: true, data: response };
  } catch (error) {
    console.log("Error in fetching Users", error);
    return { success: false, error: error };
  }
}

/// Deletes a user of the given userID
export async function deleteUser(userId) {
  return await webDelete(`/User/delete/${userId}`, {});
}

/// Creates a user given an email, username, and password
export async function createUser(email, username, password) {
  const user = {
    email: email,
    username: username,
    password: password,
    avatar: "",
  };
  try {
    const response = await webPost(`/User/create`, user);
    return { success: true, data: response };
  } catch (error) {
    console.log("Error in fetching Users", error);
    return { success: false, error: error };
  }
}

export async function loginUserApi(email, password) {
  const credentials = {
    email: email,
    password: password,
  };

  try {
    const response = await webPost(`/User/login`, credentials);
    return { success: true, data: response };
  } catch (error) {
    console.log("Error in logging in", error);
    return { success: false, error: error };
  }
}

export async function resetPasswordApi(email) {
  try {
    const response = await webPost(`/User/resetPassword`, { email });
    return { success: true, data: response };
  } catch (error) {
    console.log("Error in resetting password", error);
    return { success: false, error: "error occured" };
  }
}

/// Updates a user on the database with the given user data
export async function updateUserProfile(newProfile) {
  return await webPut(`/User/update/${newProfile.userId}`, newProfile);
}

/// Toggles a users activation status, acts as a soft delete
export async function updateActivationStatus(userId, isActive) {
  return await webPut(`/User/update/activate/${userId}`, { isActive });
}
