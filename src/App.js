import "./App.css";
import Login from "./screens/Login";
import PostDetail from "./screens/PostDetail";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PostList from "./screens/postList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/postList" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/postDetail/:id`} element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
