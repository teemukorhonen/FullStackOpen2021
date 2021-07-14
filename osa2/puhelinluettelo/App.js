import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ( {newFilter, setNewFilter} ) => {
  return (
    <form>
      <div>
        filter shown with <input value={newFilter} onChange={ e => setNewFilter(e.target.value) } />
      </div>
    </form>
  )
}

const PersonForm = ( {addName, newName, setNewName, newNumber, setNewNumber} ) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={ e => setNewName(e.target.value) }/>
      </div>
      <div>
        number: <input value={newNumber} onChange={ e => setNewNumber(e.target.value) }/>
      </div>
      <div>
        <button type="submit" onClick={addName}> add</button>
      </div>
    </form>
  )
}

const Persons = ( { peopleToShow } ) => {
  return (
    <div>
      {peopleToShow.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const filteredPeople = persons.filter( person => person.name.toLowerCase().includes( newFilter.toLowerCase() ) )

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if ( persons.some( person => person.name === nameObject.name ) ) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons( persons.concat( nameObject ) )
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>

      <h3>add a new</h3>

      <PersonForm
        addName={addName} 
        newName={newName} 
        setNewName={setNewName}
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      />

      <h3>Numbers</h3>
      <Persons peopleToShow={filteredPeople}/>

    </div>
  )

}

export default App
