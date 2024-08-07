import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response));

    setAlert([
      `A new blog ${blogObject.title} by ${blogObject.author} added`,
      "success",
    ]);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const updateLikesBlog = async (id, blogObject) => {
    const response = await blogService.update(id, blogObject);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : blogObject)));

    setAlert([
      `Blog ${blogObject.title} by ${blogObject.author} Liked by ${user.name}`,
      "success",
    ]);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));

      setAlert([`Blog ${blog.title} by ${blog.author} removed`, "success"]);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      setAlert(["Login completed successfully", "success"]);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (exception) {
      setAlert(["Wrong credentials", "error"]);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div>
      {alert && <Notification message={alert[0]} type={alert[1]} />}
      <h2>blogs</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>{user.name} logged-in</div>
          <button onClick={() => setUser(null)}>logout</button>
          {blogForm()}
        </div>
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} updateLikesBlog={updateLikesBlog} removeBlog={removeBlog} />
        ))}
    </div>
  );
};

export default App;
