import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      console.log("action.payload", action.payload);
      console.log("state", state);
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
  
export default anecdoteSlice.reducer;
