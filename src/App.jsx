import { useState, useEffect } from 'react'
import Dashboard from "./routes/Dashboard"
// import { SnackbarProvider } from "notistack"
import './App.css'
// import { BrowserRouter as Router } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'


const App = () => {
  const pollingRate = 150
  // API KEY: 21a518c670a84119
  const BASE_URL = "https://nuclear.dacoder.io/reactors"
  const apiKey = "21a518c670a84119"
  const apiKeyLink = "?apiKey=" + apiKey
  const defaultReactorObject = { "reactors": [], "plant_name": null }
  const defaultLogObject = { dynamic_id: [] }

  const [data, setData] = useState(defaultReactorObject)
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState(defaultLogObject)


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
    // Get reactors
    const rawReactors = await fetch(BASE_URL + apiKeyLink)
    const jsonReactors = await rawReactors.json()
    if (jsonReactors.reactors.length > 0) {
      const modifiedReactors = Promise.all(jsonReactors.reactors.map(async (reactor) => {
        // Get temperature
        const rawTemp = await fetch(BASE_URL + "/temperature/" + reactor.id + "" + apiKeyLink)
        const jsonTemp = await rawTemp.json()

        // Get output data
        const rawOutput = await fetch(BASE_URL + "/output/" + reactor.id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()
        return {
          ...reactor,
          tempAmount: jsonTemp.temperature.amount,
          tempUnit: jsonTemp.temperature.unit,
          tempStatus: jsonTemp.temperature.status,
          outputAmount: jsonOutput.output.amount,
          outputUnit: jsonOutput.output.unit,
        }
      })).then(reactors => setData({ "plant_name": jsonReactors.plant_name, "reactors": reactors }))

    }
    // Get log data
    const rawLogs = await fetch(BASE_URL + "/logs" + apiKeyLink)
    const jsonLogs = await rawLogs.json()
    setLogs(jsonLogs)
    setIsLoading(false)
  }
  useEffect(() => {
    const id = setInterval(getData, pollingRate) //On mount
    return () => { clearInterval(id) }  //On component dismount
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Get the plant naming function through as a prop */}
        <Dashboard data={data} logs={logs} url={{ BASE_URL: BASE_URL, apiKeyLink: apiKeyLink }} setData={setData} setLogs={setLogs} pollingRate={pollingRate}/>

      </ThemeProvider>

    </>

  )
}

export default App
