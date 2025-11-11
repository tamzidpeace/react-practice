import { NavLink, Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
