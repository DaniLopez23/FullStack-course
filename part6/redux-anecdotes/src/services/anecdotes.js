import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (con) => {
  const object = { content: con, votes: 0 , id: (100000 * Math.random()).toFixed(0)}
  const response = await axios.post(baseUrl, object)
  console.log(response.data)
  return response.data
}

const updateAnecdote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, updateAnecdote }