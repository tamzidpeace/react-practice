import { NavLink } from 'react-router'
import './App.css'

function App() {


  return (
    <>
      <h1>Home</h1>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </>
  )
}

export default App
