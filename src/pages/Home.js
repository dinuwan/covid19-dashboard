import React, { useEffect, useState } from 'react'
import { Container, Box } from '@material-ui/core'

import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeContainer from '../sections/HomeContainer'
import Loading from '../components/Loading'

import { fetchGlobalData, fetchCountryData, fetchLocalData } from '../api'

export default function FullWidthGrid() {
  const [globalData, setGlobalData] = useState()
  const [countryData, setCountryData] = useState()
  const [localData, setlocalData] = useState()
  const [selectedCountry, setSelectedCountry] = useState({ name: 'World' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      let globalD
      let countryD
      let localD

      if (!globalData) {
        globalD = await fetchGlobalData()
        setGlobalData(globalD)
      }
      if (!countryData) {
        countryD = await fetchCountryData()
        setCountryData(countryD)
      }
      if (selectedCountry && selectedCountry.name !== 'World') {
        localD = await fetchLocalData(selectedCountry.code)
        setlocalData(localD)
      }

      if (selectedCountry === null || selectedCountry === undefined) {
        setSelectedCountry({ name: 'World' })
      }

      setLoading(false)
    }

    fetchData()
    // eslint-disable-next-line
  }, [selectedCountry])

  return (
    <>
      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
        >
          <Loading />
        </Box>
      ) : (
        <>
          <Container fixed>
            <Header
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />
            <HomeContainer
              globaldata={globalData}
              countrydata={countryData}
              localdata={localData}
              selectedCountry={selectedCountry}
            />
          </Container>
          <Footer />
        </>
      )}
    </>
  )
}
