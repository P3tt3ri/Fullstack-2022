import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
//             <button onClick={showFunc(c)}>show</button>

  return (
    <div>
      <ul>
        {countries.map(c => 
          <li key={c.name.common}>{c.name.common} 
          </li>
        )}
      </ul>
    </div>
  )
}

const Country = ({ country }) => {
  console.log(country.flags["png"]) 
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital[0]}<br></br>
      area: {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(l => 
          <li key={l}>{l}</li>
        )}
      </ul>
      <img src={country.flags["png"]} alt={"the flag of "+country.name.common}></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchMsg, setSearchMsg] = useState('')
  const [filteredCountries, setFiltered] = useState([])
  const [chosen, setChosen] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

        console.log(response.data)
      })
  }, [])

  const showCountry = ( e ) => {
    console.log("show")
    let chosen_country = e.currentTarget.getAttribute("data-country")
    let filtered 
    = countries.filter(c => c.name.common === chosen_country)
    setSearchText(chosen_country)
    setFiltered(filtered)  
  }

  const handleSearchTextChange = (event) => {
    console.log(event.target.value)
    setSearchText(event.target.value)
    let filtered 
    = countries.filter(c => c.name.common.toLowerCase()
    .includes(event.target.value.toLowerCase()))
    if (filtered.length > 10) {
      setFiltered([])
      setSearchMsg("Too many matches, specify another filter.")
      return
    }
    //console.log(filtered)
    setSearchMsg("")
    setFiltered(filtered)     
  }

  console.log(filteredCountries)
  return (
    <div>
      <div>
        find countries:
        <input value={searchText} onChange={handleSearchTextChange}/>
      </div>  
      <div>{filteredCountries.length === 1 
          ? <Country country={filteredCountries[0]}/> 
          : <div>
              <ul>
              {filteredCountries.map(c => 
              <li key={c.name.common}>{c.name.common} 
                <button onClick={showCountry} data-country={c.name.common}>
                show</button></li>)} 
              </ul>
            </div>
          }    
      </div>
      <p>{searchMsg}</p>
    </div>
  )

}
export default App;
