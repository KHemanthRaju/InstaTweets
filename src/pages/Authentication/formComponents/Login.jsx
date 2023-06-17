import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { guestLoginDetails, logoImageURL } from "../../../utils/constants";
import { AuthContext } from "../../../contexts/auth-context";
import { PrimaryButton, SecondaryButton } from "../../../components/Buttons";

export const Login = () => {
  const navigate = useNavigate();
  const { loginHandler } = useContext(AuthContext);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    showPwd: false,
  });

  const loginFormInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const loginFormSubmitHandler = (event) => {
    event.preventDefault();
    loginHandler(loginDetails);
  };
  return (
    <div>
      <div>
        <img
          src={logoImageURL}
          alt="logo-img"
          className="w-full object-cover"
        />
      </div>
      <p>Unlock the Buzz, Spread your Wings!!!</p>
      <form className="flex flex-col gap-4" onSubmit={loginFormSubmitHandler}>
        <input
          className="p-[0.35rem] mt-4 rounded-md border"
          type="text"
          name="username"
          value={loginDetails.username}
          placeholder="Username"
          onChange={loginFormInputHandler}
          required
        />
        <div className="relative">
          <input
            className="p-[0.35rem] rounded-md border w-full"
            type={loginDetails.showPwd ? "text" : "password"}
            placeholder="password"
            name="password"
            value={loginDetails.password}
            onChange={loginFormInputHandler}
            required
          />

          {!loginDetails.showPwd ? (
            <AiOutlineEye
              className="absolute top-[0.7rem] right-3 cursor-pointer"
              onClick={() =>
                setLoginDetails({
                  ...loginDetails,
                  showPwd: !loginDetails.showPwd,
                })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-[0.7rem] right-3 cursor-pointer"
              onClick={() =>
                setLoginDetails({
                  ...loginDetails,
                  showPwd: !loginDetails.showPwd,
                })
              }
            />
          )}
        </div>
        <PrimaryButton type="submit">Login</PrimaryButton>
        <SecondaryButton
          className="py-2 rounded-md"
          type="submit"
          onClick={() =>
            setLoginDetails({
              ...loginDetails,
              username: guestLoginDetails.username,
              password: guestLoginDetails.password,
            })
          }
        >
          Login as Guest
        </SecondaryButton>
      </form>
      <p className="my-[1rem] text-sm">
        <span
          className="font-bold text-darkPrimary hover:underline hover:cursor-pointer"
          onClick={() => navigate("/auth/signup")}
        >
          SignUp
        </span>
      </p>
    </div>
  );
};
