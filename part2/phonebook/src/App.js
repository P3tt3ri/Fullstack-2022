import numberService from './services/numbers'
import { useState, useEffect } from 'react'

const Person = ({ person, orig, setOrig, filtered, setFiltered }) => {
  const deletePerson = (event) => {
    let shallWeDelete = window.confirm("Delete "+person.name+"?")
    console.log(shallWeDelete)
    if (shallWeDelete === false) {
      return
    }  
    let delete_id = event.currentTarget.getAttribute("data-id")
    numberService
    .deletePerson(delete_id)
    .then(response => {
      setOrig(orig.filter(p => p.id != delete_id))
      setFiltered(filtered.filter(p => p.id != delete_id))
    })    
  }  
  
  return (
    <div>
    <li key={person.id}>
      {person.name} {person.number} 
      <button onClick={deletePerson} data-id={person.id}>delete</button>
    </li>
    </div>
  )
}
const Phonebook = ({ orig, setOrig, filtered, setFiltered }) => {
  console.log("phonebook")
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filtered.map(per => 
          <Person person={per} orig={orig} setOrig={setOrig} filtered={filtered} setFiltered={setFiltered}/>
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
const Notification = ({ message }) => {
  const errorStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,  
  }
  const emptyStyle = {
  }
  console.log("notify")
  if (message === null || message === "") {
    return (
      <div style={emptyStyle}>
        {message}
      </div>
    )
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredPersons, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    if (persons.some(p => p.name === newName)) {
      let tempPerson = persons.filter(p => p.name === newName)[0]
      let thisIsUpdate = window.confirm(tempPerson.name + " is already added to phonebook. Update number?")
      if (thisIsUpdate === false) {
        return
      }
      const personObject = {
        name: newName,
        number: newNumber,
        id: tempPerson.id,
      }
      numberService
      .update(tempPerson.id, personObject)
      .then(response => {
        setErrorMessage("Updated " + newName)
        setTimeout(() => {
          setErrorMessage("")
        }, 3000)
        setSearchText('')
        setNewName('')
        setNewNumber('')
      })  
      numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
      return
    }    
    console.log("create")
    let ids = persons.map(p => p.id)
    let newId = Math.max(...ids) + 1
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId,
    }
    numberService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(personObject))
      setFiltered(persons.concat(personObject))
      setErrorMessage("Added " + newName)
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
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
      <Notification message={errorMessage} />
      <div>
        contains:
        <input value={searchText} onChange={handleSearchTextChange}/>
      </div>  
      <h2>Add a new name and number</h2>
      <PersonForm addFunc={addPerson} inp1={newName} handle1={handleNameChange}
      inp2={newNumber} handle2={handleNumberChange}
      />
      <Phonebook orig={persons} setOrig={setPersons} filtered={filteredPersons} setFiltered={setFiltered}/>
    </div>
  )
}

export default App
