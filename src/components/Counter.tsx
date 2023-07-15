import { CounterContext } from '@/context/Counter'
import React, { useContext } from 'react'

type Props = {};

const Counter = (props: Props) => {
    const {state, dispatch} = useContext(CounterContext);
    console.log(state);
  return (
    <div>
        Counter {state.count}
        <button onClick={() => dispatch({type: "INCREMENT"})}>INCREMENT</button>
        <button onClick={() => dispatch({type: "DECREMENT"})}>DECREMENT</button>
        <button onClick={() => dispatch({type: "INCREASE", payload: 10})}>INCREASE</button>
    </div>
  )
}

export default Counter