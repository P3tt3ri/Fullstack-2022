import numberService from './services/numbers'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Phonebook = ({ persons }) => {
  console.log("phonebook")
  console.log(persons)
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(per => 
          <Person key={per.id} person={per}/>
        )}
      </ul>
    </div>
  )
}
const PersonForm = ({ addFunc, inp1, handle1, inp2, handle2  }) => {
  return (
    <form onSubmit={addFunc}>
      <div>name: 
      <input
        value={inp1}
        onChange={handle1}
      />
      </div>
      <div>number: 
      <input
        value={inp2}
        onChange={handle2}
      />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredPersons, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  useEffect(
    () => {
      numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
    }, [])

  const handleSearchTextChange = (event) => {
    console.log(event.target.value)
    setSearchText(event.target.value)
    let filtered 
    = persons.filter(p => p.name.toLowerCase()
    .includes(event.target.value.toLowerCase()))
    console.log(filtered)
    setFiltered(filtered)     
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName && p.number === newNumber)) {
      alert(`${newName}: ${newNumber}  is already added to phonebook`)
      return
    }    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    numberService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(personObject))
      setFiltered(persons.concat(personObject))
      setSearchText('')
      setNewName('')
      setNewNumber('')    
    })    
    
  }
  //console.log("App")
  //console.log(filteredPersons)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        contains:
        <input value={searchText} onChange={handleSearchTextChange}/>
      </div>  
      <h2>Add a new name and number</h2>
      <PersonForm addFunc={addPerson} inp1={newName} handle1={handleNameChange}
      inp2={newNumber} handle2={handleNumberChange}
      />
      <Phonebook persons={filteredPersons}/>
    </div>
  )
}

export default App
