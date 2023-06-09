import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialPostsState, postsReducer } from "../reducers/postsReducer";
import { actionTypes } from "../utils/constants";
import { getAllPostsService } from "../services/postsServices";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState
  );

  const [isLoading, setIsLoading] = useState(false);

  const { GET_ALL_POSTS } = actionTypes;

  const getAllPosts = async () => {
    try {
      const {
        status,
        data: { posts },
      } = await getAllPostsService();
      if (status === 200) {
        postsDispatch({ type: GET_ALL_POSTS, payload: posts });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ postsState, postsDispatch, isLoading }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
