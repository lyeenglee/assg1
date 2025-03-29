import "./App.css";
import Login from "./screens/Login";
import PostDetail from "./screens/PostDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./screens/postList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/postList" element={<PostList />} />
          <Route path={`/postDetail/:id`} element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
