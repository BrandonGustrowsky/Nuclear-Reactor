import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {

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

// console.log(theme.palette.secondary.main)

  return (
    <>
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
    </>

  )
}

export default App
