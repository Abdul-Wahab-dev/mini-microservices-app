import logo from "./logo.svg";
import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="App">
      <h1>Post app</h1>
      <PostCreate />
      <hr />
      <h2>Post list</h2>
      <PostList />
    </div>
  );
}

export default App;
