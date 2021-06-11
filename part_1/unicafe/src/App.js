import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'give feedback'
  const statistics = 'statistics'


  return (
    <div>
      <Header header={feedback} />
      <Button name={'good'} value={good} setClick={setGood} />
      <Button name={'neutral'} value={neutral} setClick={setNeutral}  />
      <Button name={'bad'} value={bad} setClick={setBad} />
      <Header header={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  );
}

const Button = (props) => {
  return (
    <button onClick={() => props.setClick(props.value + 1)}>
      {props.name}
    </button>
  );
}

const Statistics = (props) => {
  let all = props.good + props.bad + props.neutral
  console.log('all: ' + all)

  if (all === 0) {
    return (
      <div>
        <p>No Feedback Given</p>
      </div>
    );
    
  }
  else {
    return (
      renderStatistics(props.good, props.neutral, props.bad, all)
    );
  }
}

const renderStatistics = (good, neutral, bad, all) => {
  return(
    <div>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all} />
      <Statistic text='average' value={averageClicks(good, bad, all)} />
      <Statistic text='positive' value={positiveClicks(good, all) + ' %'} /> 
    </div>
  );
}

const Statistic = (props) => {
  return (
    <div>
      {props.text} {props.value} 
    </div>
  );
}

const averageClicks = (good, bad, all) => {
  return(
    (good - bad) / all
   );
}

const positiveClicks = (good, all) => {
  return (
    (good / all) * 100
  );
}


export default App