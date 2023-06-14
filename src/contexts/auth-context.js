import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { loginService } from "../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
  const [token, setToken] = useState(localStorageToken?.token || "");
  const [currentuser, setCurrentUser] = useState(localStorageToken?.user);
  const [loading, setIsLoading] = useState(false);

  const loginHandler = async ({ username, password }) => {
    setIsLoading(true);
    try {
      const response = await loginService(username, password);
      console.log(response);
    } catch (err) {
      console.error(err);
      toast.error("User does not exist! Please enter correct details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
