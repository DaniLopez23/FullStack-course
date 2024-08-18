import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch({ type: "anecdotes/voteAnecdote", payload: { id } });
    dispatch({ type: "notification/setNotification", payload: `You voted for '${anecdotes.find((a) => a.id === id).content}'` });
  };setTimeout(() => {
    dispatch({ type: "notification/closeNotification", payload: ""});
  }, 3000);

  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
