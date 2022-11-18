import { useState } from 'react'
import { createTheme } from '@mui/material/styles';
import Dashboard from "./components/Dashboard"
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  let theme = createTheme({
    palette: {
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
          background: theme.palette.orange.main,
        }
      }
    },
  }
})

console.log(theme.palette.secondary.main)

  return (
    <>
        <Dashboard />
    </>

  )
}

export default App
