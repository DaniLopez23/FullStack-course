import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("submitting the form calls the event handler with the right details", async () => {
  const blog = {
    url: "www.testing-library.com",
    author: "Oscar",
    likes: 5,
    user: {
      name: "Pedro",
    },
  };

  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = container.querySelector("#title");
  const inputAuthor = container.querySelector("#author");
  const inputUrl = container.querySelector("#url");

  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "Oscar");
  await user.type(inputUrl, "www.testing-library.com");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");

});
