import Title from "../components/Title"
import ReactorTile from "../components/ReactorTile"
import { Typography, Button, Switch, Paper } from '@mui/material';
import {
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { useState } from "react"

const Dashboard = (props) => {
    const { data, logs, url, setData, setLogs } = props
    const [leftToggle, setLeftToggle] = useState(false)
    const [rightToggle, setRightToggle] = useState(false)

    const activateControlledShutdown = () => {

        data.reactors.map(async (reactor) => {
            const shutdown = await fetch(url.BASE_URL + "/controlled-shutdown/" + reactor.id + "" + url.apiKeyLink,  {
                method: "POST",
            })
            return reactor
        })
    }

    const activateEmergencyShutdown = () => {
        data.reactors.map(async (reactor) => {
            const shutdown = await fetch(url.BASE_URL + "/emergency-shutdown/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
            })
            return reactor
        })
    }

    const toggleCoolantActivation = () => {
        data.reactors.map(async () => {
            const toggleCoolant = await fetch(url.BASE_URL + "/")
        })
    }

    const activateReset = async () => {
        if (leftToggle && rightToggle) { //Only run if both switches are flipped
            const reset = await fetch(BASE_URL + "/reset" + apiKeyLink)
        }
    }

    const calculateAverageTemperature = () => {
        const temperature = data.reactors.reduce((accumulator, reactor) => {
            accumulator += reactor.tempAmount
            return accumulator
        }, 0)
    }

    let msgs = []

    logs.length > 0 && logs.map((log, index) => {
        for (const arr of Object.values(log)) {
            for (const msg of arr) {
                msgs.push(msg)
            }
        }
    })

    return (
        <>
            <Title text={data.plant_name} url={url} plantName={data.plant_name} setData={setData} />
            {/* Main Screens */}
            <section className="panel">
                <Paper elevation={5}>
                    <div>
                        <Typography style={{ fontSize: "25px" }}>Average Temperature</Typography>
                        <Typography style={{fontSize: "20px"}}>Current Average Temperature: 316 degrees C</Typography>
                        <Typography style={{fontSize: "20px"}}>100 GW output</Typography>
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
                <Button className="controlBoardBtnBlue" onClick={toggleCoolantActivation}>Enable/Disable Coolant</Button>
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