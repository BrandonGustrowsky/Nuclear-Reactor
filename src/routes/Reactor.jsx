import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Title from "../components/Title"
import { Typography, Button } from "@mui/material"
const Reactor = () => {
    const [ data, setData ] = useState({})
    const BASE_URL = "https://nuclear.dacoder.io/reactors"
    const apiKey = "21a518c670a84119"
    const apiKeyLink = "?apiKey=" + apiKey
    const { id } = useParams("id")
    const url = { BASE_URL: BASE_URL, apiKeyLink: apiKeyLink }
    const navigate = useNavigate()

    // Call this function when the user clicks the "Emergency Shutdown" button
    const activateEmergencyShutdown = async () => {
        const shutdown = await fetch(BASE_URL + "/emergency-shutdown/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
        })
    }
    
    // Call this function when the user clicks the "Controlled Shutdown" button
    const activateControlledShutdown = async () => {
        const shutdown = await fetch(BASE_URL + "/controlled-shutdown/" + id + "" + apiKeyLink,  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    }

    // Call this function when the user tries to drop a rod in the reactor
    const activateDropRod = async () => {
        const dropRod = await fetch(BASE_URL + "/drop-rod/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    }

    // Call this function when the user tries to raise a rod in the reactor
    const activateRaiseRod = async () => {
        const raiseRod = await fetch(BASE_URL + "/raise-rod/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    }

    // Call this function when the user attempts to put the reactor into maintenance mode
    const activateMaintenance = async () => {
        const maintenance = await fetch(BASE_URL + "/maintenance/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    }

    // Call this function when the user attempts to refuel the reactor
    const activateRefuel = async () => {
        const refuel = await fetch(BASE_URL + "/refuel/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    }

    // Call this function when the user attempts to start the reactor
    const activateStartReactor = async () => {
        activateMaintenance()
        activateRefuel()
        
        const startReactor = await fetch(BASE_URL + "/start-reactor/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
        })
    }

    const buildReactor = async () => {
        // Get temperature data
        const rawTemperature = await fetch(BASE_URL + "/temperature/" + id + "" + apiKeyLink)
        const jsonTemperature = await rawTemperature.json()

        // Get coolant data
        const rawCoolant = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink)
        const jsonCoolant = await rawCoolant.json()

        // Get output data
        const rawOutput = await fetch(BASE_URL + "/output/" + id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()

        // Get fuel level data
        const rawFuelLevel = await fetch(BASE_URL + "/fuel-level/" + id + "" + apiKeyLink)
        const jsonFuelLevel = await rawFuelLevel.json()

        // Get reactor state data
        const rawReactorState = await fetch(BASE_URL + "/reactor-state/" + id + "" + apiKeyLink)
        const jsonReactorState = await rawReactorState.json()

        // Get rod state data
        const rawRodState = await fetch(BASE_URL + "/rod-state/" + id + "" + apiKeyLink)
        const jsonRodState = await rawRodState.json()
        
        setData({
            temperature: jsonTemperature.temperature,
            coolant: jsonCoolant.coolant,
            output: jsonOutput.output,
            fuelLevel: jsonFuelLevel.fuel,
            reactorState: jsonReactorState.state,
            rodState: jsonRodState.control_rods,
        })
    }

    useEffect(() => {
        const id = setInterval(buildReactor, 1000) //On mount
        return () => { clearInterval(id) }  //On component dismount
      }, [])

    const getReactorData = async () => {
        //Coolant
        const rawCoolant = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink)
        const jsonCoolant = await rawCoolant.json()
        //Output
        const rawOutput = await fetch(BASE_URL + "/output/" + id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()
        //Fuel level
        const rawFuelLevel = await fetch(BASE_URL + "/fuel-level/" + id + "" + apiKeyLink)
        const jsonFuelLevel = await rawFuelLevel.json()
        //Reactor State
        const rawState = await fetch(BASE_URL + "/reactor-state/" + id + "" + apiKeyLink)
        const jsonState = await rawState.json()
        // jsonState.state = "Online"
        //Rod State
        const rawRodState = await fetch(BASE_URL + "/rod-state/" + id + "" + apiKeyLink)
        const jsonRodState = await rawRodState.json()
    }

    useEffect(() => {
        getReactorData()
    }, [])
    
    return (
        <>
            <header>
                <Title url={ url } name={ "Reactor 1" } setData={ setData } />
                <Button variant="text" id="closeBtn" onClick={() => {
                    console.log("called")
                    navigate("/")
                }}>X</Button>
            </header>
            <main>
                <Typography variant="h1" style={{fontSize: "25px"}}>{ data.reactorState }</Typography>
            </main>
            
        </>
    )
}

export default Reactor