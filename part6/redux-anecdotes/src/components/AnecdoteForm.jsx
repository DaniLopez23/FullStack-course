import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, closeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch({ type: "anecdotes/createAnecdote", payload: content });
    dispatch({ type: "notification/setNotification", payload: `You created '${content}'` });
    setTimeout(() => {
      dispatch({ type: "notification/closeNotification", payload: ""});
    }, 3000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
