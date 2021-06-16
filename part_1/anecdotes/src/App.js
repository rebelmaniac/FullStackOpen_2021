import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  
  const BUTTON_Vote = "Vote";
  const BUTTON_NextAnecdote = "Next Anecdote";

  const HEADER_1 = "Anecdote of the day";
  const HEADER_2 = "Anecdote with the most votes";

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const selectIndex = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteUpdate = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    let most = 0;
    for (let i = 0; i < points.length; ++i) {
      if (points[i] > points[most]) {
        most = i
      }
    }
    return most
  }

  return (
    <div>
      <Header text= {HEADER_1} />
      <Selected anecdotes= {anecdotes} position= {selected} points= {points} />
      <div>
        <Button text= {BUTTON_Vote} handleClick= {voteUpdate} />
        <Button text= {BUTTON_NextAnecdote} handleClick= {selectIndex} />
      </div>
      <Header text= {HEADER_2} />
      <Selected anecdotes= {anecdotes} position= {mostVotes()} points= {points} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Selected = (props) => {
  return (
    <div>
      <div>
        {props.anecdotes[props.position]}
        <br/>
        {"has " + props.points[props.position] + " votes"} 
      </div>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.text}
      </h1>
    </div>
  )
}
export default App