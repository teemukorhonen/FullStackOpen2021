import React, { useState } from 'react'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const filteredPeople = persons.filter( person => person.name.toLowerCase().includes( newFilter.toLowerCase() ) )

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
