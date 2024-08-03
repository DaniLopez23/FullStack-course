import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState([]);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <div>
      <div>
        <h2>create new</h2>
      </div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response));
    setBlogAuthor("");
    setBlogTitle("");
    setBlogUrl("");
    setAlert([`A new blog ${blogObject.title} by ${blogObject.author} added` , "success"]);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
