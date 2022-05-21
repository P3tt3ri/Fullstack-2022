import { useState } from 'react'


const arrSize = 7
const randomAnecdoteIndex = (max) => {
  return Math.floor(Math.random() * max)
//  console.log(an_index)
//  return an_index
}
const addPoint = (points, an_index) => {
  const copy = [...points]
  copy[an_index] += 1   
  return copy
}

const getMostVoted = (points) => {
  const max = Math.max(...points)
  return points.indexOf(max)
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button> )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(arrSize).fill(0))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button
        onClick={() => setPoints(addPoint(points, selected))}
        text='vote'
      />
      <Button
        onClick={() => setSelected(randomAnecdoteIndex(arrSize))}
        text='next anectode'
      />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMostVoted(points)]}</p>
      <p>has {points[getMostVoted(points)]} votes</p>
    </div>

  )
}

export default App
