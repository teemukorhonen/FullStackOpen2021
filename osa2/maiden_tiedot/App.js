import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';


const Filter = ( {newFilter, setNewFilter} ) => {
  return (
    <form>
      <div>
        filter countries <input value={newFilter} onChange={ e => setNewFilter(e.target.value)} />
      </div>
    </form>
  )
}


const Weather = () => {
  
}


const Countries = ( {countries, setNewFilter} ) => {
  if (countries.length > 10) { return <div>Too many matches, specify another filter.</div> }
  else if (countries.length > 1) {
    return ( <div>{countries.map(country => 
      <div key={country.name}>{country.name}<button onClick={() => setNewFilter(country.name)}>show</button></div>)}</div>
    )
  }
  else if (countries.length == 1) {
    const country = countries[0]
    const languages = country.languages.map( c => <li>{c.name}</li> )
    console.log(country)
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          <div><b>Capital:</b> {country.capital}</div>
          <div><b>Population:</b> {country.population}</div>
        </div>
        <h2>languages</h2>
        <div>{languages}</div>
        <br></br>
        <div><img src={country.flag} width="200"></img></div>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
  
}


function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const filteredCountries = countries.filter( country => country.name.toLowerCase().includes( newFilter.toLowerCase() ) )

  useEffect(() => {
    console.log("effect")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}></Filter>
      <Countries countries={filteredCountries} setNewFilter={setNewFilter}></Countries>
    </div>
  );
}

export default App;
