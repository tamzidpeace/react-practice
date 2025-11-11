import { useContext, useEffect, useReducer } from 'react'
import AppContext from '../contexts/AppContext';


export default function Home() {
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment': 
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 })

  const appContext = useContext(AppContext)


  return (
    <div>Home
     <div>COntext {appContext.name}</div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>


  )
}
