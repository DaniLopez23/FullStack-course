import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "www.testing-library.com",
    author: "Oscar",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);

  const element = screen.getByText(`${blog.title} ${blog.author}`);

  expect(element).toBeDefined();
});

test("clicking the button shows more info", async () => {
  const blog = {
    url: "www.testing-library.com",
    author: "Oscar",
    likes: 5,
    user: {
      name: "Pedro",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".more-info-blog");
  expect(div).toHaveTextContent("www.testing-library.comlikes 5 likePedroremove", { exact: false });
});

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    url: "www.testing-library.com",
    author: "Oscar",
    likes: 5,
    user: {
      name: "Pedro",
    },
  };

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateLikesBlog={mockHandler} />
  )

  const user = userEvent.setup()
  let button = screen.getByText("view");

  await user.click(button);

  button = screen.getByText('like')
  
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
