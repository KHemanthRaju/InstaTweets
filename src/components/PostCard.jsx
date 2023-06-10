import axios from "axios";
import { useEffect, useState } from "react";

export const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("/api/posts");
      const {
        status,
        data: { posts },
      } = response;
      if (status === 200) {
        setPosts(posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          {posts.postImage ? (
            <div>
              <img src={posts.postImage} alt="just a pic" />
            </div>
          ) : null}
          <p>{post.createdAt}</p>
          <p>{post.updatedAt}</p>
          <hr />
        </div>
      ))}
    </>
  );
};
