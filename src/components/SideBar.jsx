import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link, NavLink } from "react-router-dom";
import { PrimaryButton } from "./Buttons";
import {
  MdHome,
  MdExplore,
  MdBookmark,
  MdPerson,
  HiPlusCircle,
  HiDotsHorizontal,
} from "../../src/utils/icons";
import { UserAvatar } from "./UserAvatar";

export const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("Current User:", currentUser);
  const activeStyle = {
    backgroundColor: "orange",
    borderRadius: "9999px",
    width: "max-content",
    fontWeight: "bold",
    transform: "scale(1.05)",
  };

  return (
    <aside>
      <ul>
        <li>
          <Link to="/">
            <span>InstaTweets</span>
          </Link>
        </li>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-2 lg:py-1 lg:pl-2 lg:pr-4 w-max flex justify-center items-center hover:bg-lighterPrimary hover:rounded-full  dark:hover:text-darkColor active:dark:text-darkColor"
          >
            <MdHome className="px-0.5 text-3xl lg:pr-2" />
            <span className="hidden lg:inline">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/explore"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-2 lg:py-1 lg:pl-2 lg:pr-4 w-max flex justify-center items-center hover:bg-lighterPrimary hover:rounded-full  dark:hover:text-darkColor dark:active:text-darkColor"
          >
            <MdExplore className="px-0.5 text-3xl lg:pr-2" />
            <span className="hidden lg:inline">Explore</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bookmarks"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-2 lg:py-1 lg:pl-2 lg:pr-4 w-max flex justify-center items-center hover:bg-lighterPrimary hover:rounded-full  dark:hover:text-darkColor dark:active:text-darkColor"
          >
            <MdBookmark className="px-0.5 text-3xl lg:pr-2" />
            <span className="hidden lg:inline">Bookmarks</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-2 lg:py-1 lg:pl-2 lg:pr-4 w-max flex justify-center items-center hover:bg-lighterPrimary hover:rounded-full  dark:hover:text-darkColor dark:active:text-darkColor"
          >
            <MdPerson className="px-0.5 text-3xl lg:pr-2" />
            <span className="hidden lg:inline">Profile</span>
          </NavLink>
        </li>
        <li className=" sm:flex px-0 sm:px-1 lg:p-0 w-max lg:w-full">
          <HiPlusCircle className="px-2 text-[2.75rem] hover:bg-lighterPrimary hover:rounded-full  dark:hover:text-darkColor lg:hidden" />
          <PrimaryButton className="mx-2 rounded-lg w-max lf:w-full py-1 pl-2 pr-4  justify-center items-center hidden lg:flex">
            <HiPlusCircle className="px-0.5 text-3xl lg:pr-2" />
            <span className="hidden lg:inline lg:pr-2">New Post</span>
          </PrimaryButton>
        </li>

        <li className="flex p-2 w-max sm:hidden">
          <UserAvatar clsassName="h-8 w-8" user={currentUser} />
        </li>
      </ul>
      <ul className="hidden sm:flex tracking-wide pr-2">
        <li className="p-3 w-max flex items-center justify-center gap-2">
          <UserAvatar className="h-10 w-10" user={currentUser} />
          <div className="hidden text-sm lg:inline">
            <p className="font-bold">
              {currentUser?.firstName + " " + currentUser?.lastName}
            </p>
            <p className="font-normal">@{currentUser?.username}</p>
          </div>
          <HiDotsHorizontal className="ml-4 hidden lg:inline" />
        </li>
      </ul>
    </aside>
  );
};
