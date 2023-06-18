import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { loginService, signupService } from "../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
  const [token, setToken] = useState(localStorageToken?.token || "");
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user);
  const [loading, setIsLoading] = useState(false);

  const loginHandler = async ({ username, password }) => {
    console.log("Username", username);
    setIsLoading(true);
    try {
      const response = await loginService(username, password);
      console.log("Response :", response);
      const {
        status,
        data: { encodedToken, foundUser },
      } = response;
      if (status === 200) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ token: encodedToken, user: foundUser })
        );
        setToken(encodedToken);
        setCurrentUser(foundUser);
        toast.success(`Welcome back,${foundUser.firstName}!`, { icon: "👋" });
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("User does not exist! Please enter correct details.");
    } finally {
      setIsLoading(false);
    }
  };

  const signupHandler = async ({ firstName, lastName, username, password }) => {
    setIsLoading(true);
    try {
      const response = await signupService(
        firstName,
        lastName,
        username,
        password
      );
      const {
        status,
        data: { createdUser, encodedToken },
      } = response;
      if (status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setToken(encodedToken);
        setCurrentUser(createdUser);
        toast.success(`Hi, ${createdUser.firstName.firstName}!`, {
          icon: "👋",
        });
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginDetails");
    setToken(null);
    setCurrentUser(null);
    toast.success("Logged out successfully!");
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        logoutHandler,
        loading,
        loginHandler,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
