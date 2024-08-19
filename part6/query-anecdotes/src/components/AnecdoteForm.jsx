import { useQuery, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes';
import NotificationContext from '../context/notificationContext';
import { useContext } from 'react';

const AnecdoteForm = () => {

  const newNoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newNoteMutation.mutate(content)
    dispatch({ type: 'SET_NOTIFICATION', data: `you created '${content}'` })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    },5000)
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
