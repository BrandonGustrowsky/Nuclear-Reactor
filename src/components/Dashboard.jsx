import Title from "./Title"
import ReactorTile from "./ReactorTile"
import { Typography, Button, Switch, Grid } from '@mui/material';
import { useState } from "react"

const Dashboard = (props) => {
    const { data, apiKey, setData } = props
    // console.log(reactors)
    return (
        <>
            <Title text={data.plant_name}/>
            {/* Main Screens */}
            <section className="panel">
                <div id="leftScreen">
                    <Typography style={{fontSize: "25px"}}>Average Temperature</Typography>
                </div>
                <div id="centerScreen">
                    {data.reactors.length > 0 && data.reactors.map((reactor, index) => {
                        // console.log(reactor)
                        return <ReactorTile key={index} reactor={reactor} apiKey={apiKey}/>
                    })}
                </div>
                <div id="rightScreen">
                    <Typography style={{fontSize: "25px"}}>System Logs</Typography>
                </div>
            </section>
            <section className="controlBoard">
                <Button className="controlBoardBtnOrange">Emergency Shutdown</Button>
                <Button className="controlBoardBtnBlue">Controlled Shutdown</Button>
                <Button className="controlBoardBtnBlue">Enable/Disable Coolant</Button>
                <Button className="controlBoardBtnOrange">RESET</Button>
            </section>
            <div className="toggleButtons">
                <Switch className="toggleSwitch" />
                <Switch className="toggleSwitch" />
            </div>
        </>
    )
}

export default Dashboard