import { useState, useEffect } from 'react'
import './App.css'
import Result from './Result'
import country from './services/country'
function App() {
  const [countryName, setCountryName] = useState("")
  const [resultCountries, setResultCountries] = useState([])

  useEffect(() => {
    country.getAllWithName(countryName).then(response => {
      setResultCountries(response)
    })
  }, [countryName])

  const handleSelectedCountry = (e) => {
    setCountryName(e.target.value)
  }

  return (
    <>
      <div>find countries</div>
      <input value={countryName} type="text" onChange={handleSelectedCountry}/>
      <Result countries={resultCountries}/>
    </>
  )
}

export default App
