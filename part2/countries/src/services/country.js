import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllWithName = (countryName) => {

  const request = axios.get(baseUrl)
  const countries = request.then(response => response.data)
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))
  
  if (filteredCountries.length > 10) {
    return ['Too many matches, specify another filter']
  }
  return filteredCountries
}

export default getAllWithName