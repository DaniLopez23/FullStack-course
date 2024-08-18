import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {<Notification /> ? <Notification /> : null}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
