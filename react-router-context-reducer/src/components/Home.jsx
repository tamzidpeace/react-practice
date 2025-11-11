import React, { useContext } from 'react'
import AppContext from '../context/AppContext';

export default function Home() {
  const context = useContext(AppContext);

  return (
    <div>
        Home
        <div>count {context.count}</div>
        <button onClick={() => context.setCount(context.count + 1)}>increment</button>
    </div>
  )
}
