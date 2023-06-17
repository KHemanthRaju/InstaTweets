import { actionTypes } from "../utils/constants";

export const initialPostsState = {
  posts: [],
};
const { GET_ALL_POSTS } = actionTypes;
export const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_ALL_POSTS:
      return { ...state, posts: payload };
    default:
      return state;
  }
};
