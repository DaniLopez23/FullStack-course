import React, { useState } from "react";

const Blog = ({ blog, updateLikesBlog, removeBlog }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    updateLikesBlog(blog.id,updatedBlog);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author} {!showMoreInfo ? <button onClick={() => setShowMoreInfo(!showMoreInfo)}>view</button> : <button onClick={() => setShowMoreInfo(!showMoreInfo)}>hide</button>}
      {showMoreInfo && (
        <div className="more-info-blog">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
