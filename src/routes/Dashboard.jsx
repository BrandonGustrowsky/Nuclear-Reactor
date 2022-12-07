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
    const { data, url, setData } = props
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
    
    return (
        <>
            <Title text={data.plant_name} url={url} plantName={data.plant_name} setData={setData} />
            {/* Main Screens */}
            <section className="panel">
                <Paper elevation={5}>
                    <div>
                        <Typography style={{ fontSize: "25px" }}>Average Temperature</Typography>
                    </div>
                </Paper>
                <Paper elevation={5}>
                    {data.reactors && data.reactors.map((reactor, index) => {
                        return <ReactorTile key={index} reactor={reactor} url={url} />
                    })}
                </Paper>
                <Paper elevation={5}>
                    <Typography style={{ fontSize: "25px" }}>System Logs</Typography>
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