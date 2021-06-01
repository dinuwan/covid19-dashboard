import axios from 'axios'

// axios.defaults.baseURL= process.env.REACT_APP_COVID_API

export const fetchGlobalData = async () => {
  try {
    const res = await axios.get('https://corona-api.com/timeline')
    return res.data.data
  } catch (error) {
    console.log('Error fetching data')
  }
}

// Fetch country data
export const fetchCountryData = async () => {
  try {
    const res = await axios.get('https://corona-api.com/countries')

    return res.data.data
  } catch (error) {
    console.log('Error fetching data')
  }
}

// Fetch local data
export const fetchLocalData = async countryCode => {
  try {
    const res = await axios.get(
      `https://corona-api.com/countries/${countryCode}`
    )

    return res.data.data
  } catch (error) {
    console.log('Error fetching data')
  }
}
