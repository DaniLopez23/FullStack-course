import { Link } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/createAnecdote' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
      </>
    )
  }

export default Menu