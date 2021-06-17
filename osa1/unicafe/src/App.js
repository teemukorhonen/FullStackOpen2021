import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if ( text === "positive" ) {
    return (
      <tr>
        <td>{text}</td>
        <td>{(100*value).toFixed(1)}</td>
        <td>%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all

  if (good === 0 && neutral === 0 && bad === 0) { 
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average.toFixed(2)}/>
        <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button text="good" handleClick={() => setGood(good+1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral+1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad+1)}></Button>
      <Header text="statistics"></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
