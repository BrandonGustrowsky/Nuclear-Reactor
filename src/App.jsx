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
    console.log(jsonReactors.reactors[0])
    if (jsonReactors.reactors.length > 0) {
      const modifiedReactors = Promise.all(jsonReactors.reactors.map( async (reactor) => {
        // console.log(reactor) //Promise.all() to resolve asyncronous map function array of Promises
        // Temperature
        const rawTemp = await fetch(BASE_URL + "/temperature/" + reactor.id + "" + apiKeyLink)
        const jsonTemp = await rawTemp.json()
        return {
          ...reactor,
          tempAmount: jsonTemp.temperature.amount,
          tempUnit: jsonTemp.temperature.unit,
          tempStatus: jsonTemp.temperature.status,
        }
      })).then(reactors => setData({"plant_name" : jsonReactors.plant_name, "reactors" : reactors}))
      console.log(data)
      
      // setReactors(modifiedReactors) gives a 'fulfilled' Promise even though I'm already running Promise.all()?
    }
    setIsLoading(false)
  }
  useEffect(() => {
    const id = setInterval(getData, 1000) //On mount
    return () => {clearInterval(id)}  //On component dismount
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Get the plant naming function through as a prop */}
        <Dashboard reactors={data.reactors} apiKey={apiKey} plantName={data.plant_name} changePlantName={setData} /> 
      </ThemeProvider>
    </>

  )
}

export default App
