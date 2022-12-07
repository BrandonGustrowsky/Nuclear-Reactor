import Title from "../components/Title"
import ReactorTile from "../components/ReactorTile"
import { Typography, Button, Switch } from '@mui/material';
import {
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { useState } from "react"

const Dashboard = (props) => {
    const { data, url, setData } = props

    const startReactors = () => {
        data.reactors.map(async (reactor) => {
            const maintenance = await fetch(url.BASE_URL + "/maintenance/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
            })
            const refuel = await fetch(url.BASE_URL + "/refuel/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
            })
            const startReactor = await fetch(url.BASE_URL + "/start-reactor/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
            })
            return reactor
        })
    }

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
        data.reactors.map(() => {
            const toggleCoolant = fetch(url.BASE_URL + "/")
        })
    }

    const activateReset = async () => {
        const reset = fetch(BASE_URL + "/reset" + apiKeyLink)
    }

    return (
        <>
            <Title text={data.plant_name} url={url} plantName={data.plant_name} setData={setData} />
            {/* Main Screens */}
            <section className="panel">
                <div id="leftScreen">
                    <div className="leftScreenChildOne"style={{position: "absolute", top: "-20px", zIndex: 2, background:"red"}}></div>
                    <div className="leftScreenChildTwo" style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 6}}>
                        <Typography style={{ fontSize: "25px" }}>Average Temperature</Typography>
                    </div>
                </div>
                <div id="centerScreen">
                    {data.reactors && data.reactors.map((reactor, index) => {
                        return <ReactorTile key={index} reactor={reactor} url={url} />
                    })}
                </div>
                <div id="rightScreen">
                    <Typography style={{ fontSize: "25px" }}>System Logs</Typography>
                </div>
            </section>
            <section className="controlBoard">
                <Button className="controlBoardBtnOrange" onClick={activateEmergencyShutdown}>Emergency Shutdown</Button>
                <Button className="controlBoardBtnBlue" onClick={activateControlledShutdown}>Controlled Shutdown</Button>
                <Button className="controlBoardBtnBlue" onClick={toggleCoolantActivation}>Enable/Disable Coolant</Button>
                <Button className="controlBoardBtnOrange" onClick={activateReset}>RESET</Button>
            </section>
            <div className="toggleButtons">
                <Switch className="toggleSwitch" />
                <Switch className="toggleSwitch" />
            </div>
        </>
    )
}

export default Dashboard