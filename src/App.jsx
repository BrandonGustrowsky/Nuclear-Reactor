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

  const [reactors, setReactors] = useState(defaultReactorObject)
  const [reactorData, setReactorData] = useState({})
  const [plantName, setPlantName] = useState("Plant Name")
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

  const getPerReactorData = async (reactor) => {
    //Temperature per reactor
    const rawTemp = await fetch(BASE_URL + "/temperature/" + reactor.id + apiKeyLink)
    const temp = await rawTemp.json()

    //Coolant per reactor
    const rawCoolant = await fetch(BASE_URL + "/coolant/" + reactor.id + apiKeyLink)
    const coolant = await rawCoolant.json()

    setReactorData({
      ...temp.temperature,
      coolant,
    })
  }

  const getData = async () => {
    // Reactors
    const rawReactors = await fetch("https://nuclear.dacoder.io/reactors?apiKey=" + apiKey)
    const jsonReactors = await rawReactors.json()

    const modifiedReactors = jsonReactors.reactors.map((reactor) => {
      return {
        ...reactor,
        tempAmount: reactorData.amount,
        tempUnit: reactorData.unit,
        tempStatus: reactorData.status,
      }
    })

    setReactors(modifiedReactors)
    setPlantName(jsonReactors.plant_name)
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      getData()
      setIsLoading(false)
    })()
  }, [])

  setInterval(getData, 250)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard reactors={reactors} apiKey={apiKey} />
      </ThemeProvider>
    </>

  )
}

export default App
