import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + bad + neutral
  if (all === 0){
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }
  
  return(
    <>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={all}/>
      <StatisticsLine text='average' value={(good - bad) / all}/>
      <StatisticsLine text='positive' value={good / all * 100} />
    </>
  )
}

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>
   

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text='good'/>
      <Button handler={() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Button handler={() => setBad(bad + 1)} text = 'bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
