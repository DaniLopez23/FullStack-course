import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes, handleVote }) => {
    const id = useParams().id;
    
    console.log("anecdotes", anecdotes);
    console.log("id", id);
    
    const anecdote = anecdotes.find((a) => a.id == id);

    console.log("anecdote", anecdote);

    return (
      <>
        <h3>
          {anecdote.content} by {anecdote.author}
        </h3>
        <p>
          has <em>{anecdote.votes}</em> votes
        </p>
        <p>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </>
    );
  };

export default Anecdote;