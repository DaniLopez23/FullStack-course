import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    createBlog(blogObject);

    setBlogAuthor("");
    setBlogTitle("");
    setBlogUrl("");
  };

  return (
    <div>
      <div>
        <h2>create new</h2>
      </div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
