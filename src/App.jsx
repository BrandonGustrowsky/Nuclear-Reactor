import { useState, useEffect } from 'react'
import Dashboard from "./components/Dashboard"
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {
  // API KEY: 21a518c670a84119
  const apiKey = "21a518c670a84119"
  const defaultReactorObject = {"reactors": [], "plant_name": "Nuclear Plant"}

  const [reactors, setReactors] = useState(defaultReactorObject)
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

useEffect(() => {
  (async () => {
    setIsLoading(true)
    // Reactors
    const rawReactors = await fetch("https://nuclear.dacoder.io/reactors?apiKey=" + apiKey)
    const jsonReactors = await rawReactors.json()

    setReactors(jsonReactors.reactors)
    setPlantName(jsonReactors.plant_name)
    setIsLoading(false)
  })()
}, [])

  return (
    <>
    {console.log(reactors)}
    <ThemeProvider theme={theme}>
      <Dashboard reactors={reactors} apiKey={apiKey}/>
    </ThemeProvider>
    </>

  )
}

export default App
