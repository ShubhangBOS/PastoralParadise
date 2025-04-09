import { createUrl, post } from "./http";

export const login = async (emailid, password) => {
  try {
    const response = await post(createUrl("api/Login/Login"), {
      emailid,
      password,
    });
    return response.data;
  } catch (err) {
    alert("Could not login");
    return null;
  }
};

export const signup = async (emailid, firstName, lastName, password) => {
  try {
    const response = await post(createUrl("api/Login/Signup"), {
      emailid,
      firstName,
      lastName,
      password,
    });
    return response.data;
  } catch (err) {
    alert("Could not sign up");
    return null;
  }
};
