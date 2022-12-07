import { useState, useEffect } from 'react'
import Dashboard from "./routes/Dashboard"
import './App.css'
// import { BrowserRouter as Router } from "react-router-dom"
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
    if (jsonReactors.reactors.length > 0) {
      const modifiedReactors = Promise.all(jsonReactors.reactors.map(async (reactor) => {
        // Temperature
        const rawTemp = await fetch(BASE_URL + "/temperature/" + reactor.id + "" + apiKeyLink)
        const jsonTemp = await rawTemp.json()
        return {
          ...reactor,
          tempAmount: jsonTemp.temperature.amount,
          tempUnit: jsonTemp.temperature.unit,
          tempStatus: jsonTemp.temperature.status,
        }
      })).then(reactors => setData({ "plant_name": jsonReactors.plant_name, "reactors": reactors }))

    }
    setIsLoading(false)
  }
  useEffect(() => {
    const id = setInterval(getData, 1000) //On mount
    return () => { clearInterval(id) }  //On component dismount
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Get the plant naming function through as a prop */}
        <Dashboard data={data} url={{ BASE_URL: BASE_URL, apiKeyLink: apiKeyLink }} setData={setData} />
      </ThemeProvider>

    </>

  )
}

export default App
