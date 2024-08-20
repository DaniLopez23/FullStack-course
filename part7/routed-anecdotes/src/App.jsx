import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import AnecdoteForm from "./components/AnecdoteForm";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));


  };

  return (
    <>
      <h1>Software anecdotes</h1>
      <p>{notification}</p>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={<AnecdoteList anecdotes={anecdotes}/>}
          />
          <Route path="/about" element={<About />} />
          <Route path="/createAnecdote" element={<AnecdoteForm addNew={addNew}/>} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} handleVote={vote} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
