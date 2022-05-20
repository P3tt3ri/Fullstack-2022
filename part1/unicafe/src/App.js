import { useState, useEffect } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button> )

const StatisticLine = (props) => {
  const { text1, stat, text2 } = props
//  console.log(text1)
//  console.log(stat)
//  console.log(text2)
  return (
//      <p>{text1} {stat} {text2} </p>	  
      <tr>
         <td>{text1}</td>
         <td>{stat} {text2}</td>
      </tr>
)
}
  
const Statistics = (props) => {
  const {good, neutral, bad, avg, posit} = props
  if (good+neutral+bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  console.log(good, neutral, bad)
  return (
    <div>
      <h1>statistics</h1>
      <table>
      <tbody>  
      <StatisticLine text1="good" stat={good} text2=" "/>
      <StatisticLine text1="neutral" stat={neutral} text2=" "/>
      <StatisticLine text1="bad" stat={bad} text2=" "/>
      <StatisticLine text1="all" stat={good+neutral+bad} text2=" "/>
      <StatisticLine text1="average" stat={avg} text2=" "/>
      <StatisticLine text1="positive" stat={posit} text2="%"/>
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [posit, setPosit] = useState(0)

  useEffect(
    () => {
    if (good+neutral+bad > 0)	{  
        setAvg((good-bad)/(good+neutral+bad))
        setPosit((good/(good+neutral+bad))*100)
    }    
  }, [good, neutral, bad]);	
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={() => setGood(good + 1)}
        text='good'
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text='neutral'
      />     
      <Button
        onClick={() => setBad(bad + 1)}
        text='bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} avg={avg} posit={posit}/>
    </div>     	  
  )
}

export default App

