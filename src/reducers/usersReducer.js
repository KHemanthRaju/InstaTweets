import { actionTypes } from "../utils/constants";

export const initialUsersState = {
  users: [],
};

const { GET_ALL_USERS } = actionTypes;

export const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};
