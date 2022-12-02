import { useState, useEffect } from 'react'
import Dashboard from "./components/Dashboard"
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {
  // API KEY: 21a518c670a84119
  const BASE_URL = "https://nuclear.dacoder.io/reactors"
  const apiKey = "21a518c670a84119"
  const apiKeyLink = "?apiKey=" + apiKey
  const defaultReactorObject = { "reactors": [], "plant_name": "Nuclear Plant" }

  const [data, setData] = useState(defaultReactorObject)
  const [isLoading, setIsLoading] = useState(false)

  let theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0B3954" //dark blue
      },
      secondary: {
        main: "#BFD7EA" //light blue
      },
      orange: {
        main: "#FF6663", //orange
      },
      neon: {
        main: "#E0FF4F", //neon green
      },
      white: {
        main: "#FEFFFE" //white
      }
    }
  })

  theme = createTheme(theme, {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: theme.palette.secondary.main,
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            background: theme.palette.primary.main,
            color: theme.palette.white.main,
          }
        }
      }
    }
  })

  const getData = async () => {
    setIsLoading(true)
    // Reactors
    const rawReactors = await fetch(BASE_URL + apiKeyLink)
    const jsonReactors = await rawReactors.json()
    // console.log(jsonReactors.reactors[0])
    if (jsonReactors.reactors.length > 0) {
      const modifiedReactors = Promise.all(jsonReactors.reactors.map( async (reactor) => {
        // Temperature
        const rawTemp = await fetch(BASE_URL + "/temperature/" + reactor.id + "" + apiKeyLink)
        const jsonTemp = await rawTemp.json()
        //Coolant
        const rawCoolant = await fetch(BASE_URL + "/coolant/" + reactor.id + "" + apiKeyLink)
        const jsonCoolant = await rawCoolant.json()
        //Output
        const rawOutput = await fetch(BASE_URL + "/output/" + reactor.id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()
        //Fuel level
        const rawFuelLevel = await fetch(BASE_URL + "/fuel-level/" + reactor.id + "" + apiKeyLink)
        const jsonFuelLevel = await rawFuelLevel.json()
        //Reactor State
        const rawState = await fetch(BASE_URL + "/reactor-state/" + reactor.id + "" + apiKeyLink)
        const jsonState = await rawState.json()
        // jsonState.state = "Online"
        const maintenance = await fetch(BASE_URL + "/maintenance/" + reactor.id + "" + apiKeyLink, {
          method: "POST",
        })
        const refuel = await fetch(BASE_URL + "/refuel/" + reactor.id + "" + apiKeyLink, {
          method: "POST",
        })
        const startReactor = await fetch(BASE_URL + "/start-reactor/" + reactor.id + "" + apiKeyLink, {
          method: "POST",
        })
        //Rod State
        const rawRodState = await fetch(BASE_URL + "/rod-state/" + reactor.id + "" + apiKeyLink)
        const jsonRodState = await rawRodState.json()
        return {
          ...reactor,
          tempAmount: jsonTemp.temperature.amount,
          tempUnit: jsonTemp.temperature.unit,
          tempStatus: jsonTemp.temperature.status,
          coolantStatus: jsonCoolant.coolant,
          output: jsonOutput.output,
          fuelLevel: jsonFuelLevel.fuel,
          reactorState: jsonState,
          rodState: jsonRodState
        }
      })).then(reactors => setData({"plant_name" : jsonReactors.plant_name, "reactors" : reactors}))
      console.log(data.reactors)
      
      // setReactors(modifiedReactors) gives a 'fulfilled' Promise even though I'm already running Promise.all()?
    }
    setIsLoading(false)
  }
  useEffect(() => {
    const id = setInterval(getData, 250) //On mount
    return () => {clearInterval(id)}  //On component dismount
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Get the plant naming function through as a prop */}
        <Dashboard data={data} apiKey={apiKey} plantName={data.plant_name} setData={setData} /> 
      </ThemeProvider>
    </>

  )
}

export default App
