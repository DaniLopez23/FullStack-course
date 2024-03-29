import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Vote = ({copy, indexAnecdote}) => {
  
  if (copy[indexAnecdote] === 0){
    return(
      <div>
        <>No votes yet</>
      </div>  
    )
    
  }
  return(
    <div>
        <>No votes yet</>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  

  const randomAnecdote = () => {
    const ranAn=props.anecdotes[Math.floor(Math.random()*props.anecdotes.length)]
    setSelected(props.anecdotes.indexOf(ranAn))
  }

 

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={randomAnecdote}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)