import axios from "axios";

export const loginService = async (username, password) =>
  await axios.post("/api/auth/login", {
    username: username,
    password: password,
  });

export const signupService = async (username, password, firstName, lastName) =>
  axios.post("/api/auth/signup", {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
