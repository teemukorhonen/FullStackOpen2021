import React, { useState } from 'react'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})

  const handleVoting = () => {
    setPoints( points => {
      const copy = { ...points }
      copy[selected] += 1
      return (
        copy
      )
    })
  }

  const findMostVotes = () => {
    let currentBest = -1
    let currentBestIndex = -1
    for (let i = 0; i < 7; i++) {
      const element = points[i];
      if ( element > currentBest ) {
        currentBestIndex = i
        currentBest = element
      }
    }
    return currentBestIndex
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <Button text="vote" handleClick={ handleVoting}></Button>
      <Button text="next anecdote" handleClick={ () => setSelected( Math.floor(Math.random()*7) ) }></Button>
      <Header text="Anecdote with most votes" />
      {anecdotes[findMostVotes()]}
      <br></br>
      has {points[findMostVotes()]} votes
    </div>
  )
}

export default App