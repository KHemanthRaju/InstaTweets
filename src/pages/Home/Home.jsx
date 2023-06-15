import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { ThemeContext } from "../../contexts/theme-context";
import SuggestedUsers from "../../components/SuggestedUsers";

export const Home = () => {
  const { logoutHandler } = useContext(AuthContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  return (
    <div className="dark:bg-darkGrey dark:text-lightGrey transition-all duration-500 min-h-screen">
      <SuggestedUsers />
      <br />
      <br />
      <button onClick={logoutHandler}>Logout</button>
      <br />
      <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
        Theme{isDarkTheme ? "Dark" : "Light"}
      </button>
    </div>
  );
};
