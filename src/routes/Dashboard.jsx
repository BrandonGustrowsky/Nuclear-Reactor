import Title from "../components/Title"
import ReactorTile from "../components/ReactorTile"
import { Typography, Button, Switch, Paper } from '@mui/material';
import {
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { useState } from "react"
import { useSnackbar } from 'notistack';
import Graph from "../components/Graph"

const Dashboard = (props) => {
    const { data, logs, url, setData, setLogs } = props
    const [leftToggle, setLeftToggle] = useState(false)
    const [rightToggle, setRightToggle] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const activateControlledShutdown = () => {
        data.reactors.map(async (reactor) => {
            const response = await fetch(url.BASE_URL + "/controlled-shutdown/" + reactor.id + "" + url.apiKeyLink,  {
                method: "POST",
            })
            if (response.status === 201) {
                enqueueSnackbar(`${reactor.name} was successfully shut down.`)
            } else {
                const text = await response.text()
                enqueueSnackbar(text)
            }
            return reactor
        })
    }

    const activateEmergencyShutdown = () => {
        data.reactors.map(async (reactor) => {
            const response = await fetch(url.BASE_URL + "/emergency-shutdown/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
            })
            if (response.status === 201) {
                enqueueSnackbar("Emergency shutdown successful")
            } else {
                const text = await response.text()
                enqueueSnackbar(text)
            }
            return reactor
        })
    }

    const toggleCoolantActivation = (state) => {
        // https://nuclear.dacoder.io/reactors/coolant/0541c510-3703-41fe-b4f8-31c8087ddb55?apiKey=21a518c670a84119
        // https://nuclear.dacoder.io/reactors/coolant/1b1efccd-6526-41fd-8815-d0e0a99a94f0?apiKey=21a518c670a84119
        data.reactors.map(async (reactor) => {
            console.log("URL FOR COOLANT ==>   " + url.BASE_URL + "/coolant/" + reactor.id + "" + url.apiKeyLink)
            const response = await fetch(url.BASE_URL + "/coolant/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                // mode: "CORS",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    coolant: state,
                }),
            });
            if (response.status === 201 || response.status === 304) {
                enqueueSnackbar(`${reactor.name}'s coolant is ${state}.`)
            } else {
                const text = await response.text()
                enqueueSnackbar(text)
            }
        })
    }

    const activateReset = async () => {
        if (leftToggle && rightToggle) { //Only run if both switches are flipped
            const response = await fetch(url.BASE_URL + "/reset" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
            if (response.status !== 201) {
                const text = await response.text()
                enqueueSnackbar(text)
            } else {
                enqueueSnackbar("Global reset was successful!")
            }

        } else {
            enqueueSnackbar("Both safety levers must be turned on to perform a global reset!")
        }
        
    }

    let temperatureUnit = "F"

    const calculateAverageTemperature = () => {
        const temperature = data.reactors.reduce((accumulator, reactor) => {
            accumulator += reactor.tempAmount
            temperatureUnit = reactor.tempUnit
            return accumulator
        }, 0)
        return (temperature/data.reactors.length).toFixed(2)
    }

    const outputUnit = "Gigawatt (GW)"
    const calculateTotalOutput = () => {
        const totalMegawattOutput = data.reactors.reduce((accumulator, reactor) => {
            accumulator += reactor.outputAmount
            return accumulator
        }, 0)
        return (totalMegawattOutput/1000).toFixed(2) // Convert to Gigawatts (project specification)
    }

    let msgs = []

    logs.length > 0 && logs.map((log, index) => { // Get each object
        for (const arr of Object.values(log)) { // Get the array of messages from each object
            for (const msg of arr) { //Get each individual message
                msgs.push(msg)
            }
        }
    })

    return (
        <>
            <Title url={url} name={data.plant_name} setData={setData} />
            {/* Main Screens */}
            <section className="panel">
                <Paper elevation={5}>
                    <div>
                        <Typography style={{ fontSize: "25px" }}>Average Temperature</Typography>
                        <Graph data={data.reactors} width="500px" height="200px"/>
                        <Typography style={{fontSize: "20px"}}>Current Avg. Temp: {calculateAverageTemperature()} {temperatureUnit}</Typography>
                        <Typography style={{fontSize: "20px"}}>{calculateTotalOutput()} {outputUnit} output</Typography>
                    </div>
                </Paper>
                <Paper elevation={5}>
                    {data.reactors && data.reactors.map((reactor, index) => {
                        return <ReactorTile key={index} reactor={reactor} url={url} />
                    })}
                </Paper>
                <Paper elevation={5}>
                    <Typography style={{ fontSize: "25px" }}>System Logs</Typography>
                    <Paper id="logsContainer">
                    {msgs.map((msg) => {
                        return <p style={{lineHeight: "20px"}}>{msg}</p>
                    })}
                    </Paper>
                </Paper>
            </section>
            <section className="controlBoard">
                <Button className="controlBoardBtnOrange" onClick={activateEmergencyShutdown}>Emergency Shutdown</Button>
                <Button className="controlBoardBtnBlue" onClick={activateControlledShutdown}>Controlled Shutdown</Button>
                <Button className="controlBoardBtnBlue" onClick={() => {toggleCoolantActivation("on")}}>Enable Coolant</Button>
                <Button className="controlBoardBtnBlue" onClick={() => {toggleCoolantActivation("off")}}>Disable Coolant</Button>
                <Button className="controlBoardBtnOrange" onClick={activateReset}>RESET</Button>
            </section>
            <div className="toggleButtons">
                <Switch className="toggleSwitch" onClick={() => {
                    setLeftToggle((prevLeftToggle) => {
                        return !prevLeftToggle
                    })
                }}/>
                <Switch className="toggleSwitch" onClick={() => {
                    setRightToggle((prevRightToggle) => {
                        return !prevRightToggle
                    })
                }}/>
            </div>
        </>
    )
}

export default Dashboard