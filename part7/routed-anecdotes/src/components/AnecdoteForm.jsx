import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const AnecdoteForm = (props) => {

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/');
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} reset={undefined} />
          </div>
          <div>
            author
            <input {...author} reset={undefined} />
          </div>
          <div>
            url for more info
            <input {...info} reset={undefined} />
          </div>
          <button>create</button>
        </form>
        
      </div>
    )
  
  }

export default AnecdoteForm;