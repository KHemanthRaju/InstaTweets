import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";
import { PostCard } from "./components/PostCard";

function App() {
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

  console.log(posts);

  return (
    <div className="App">
      <h1>Social Media Application</h1>
      <nav>
        <Link to="/">Home ||</Link>
        <Link to="/posts">Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostCard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {/* {posts} */}
    </div>
  );
}

export default App;
