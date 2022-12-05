import Title from "./Title"
import ReactorTile from "./ReactorTile"
import { Typography, Button, Switch, Grid } from '@mui/material';
import { useState } from "react"

const Dashboard = (props) => {
    const { data, url, setData } = props
    // console.log(data.reactors)

    const startReactors = () => {
        setData(data.reactors.map( async(reactor) => {
            const maintenance = await fetch(url.BASE_URL + "/maintenance/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
              })
              const refuel = await fetch(url.BASE_URL + "/refuel/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
              })
              const startReactor = await fetch(url.BASE_URL + "/start-reactor/" + reactor.id + "" + url.apiKeyLink, {
                method: "POST",
              })
              return reactor
        }))
    }
    return (
        <>
            <Title text={data.plant_name} url={url} plantName={data.plant_name} setData={setData}/>
            {/* Main Screens */}
            <section className="panel">
                <div id="leftScreen">
                    <Typography style={{fontSize: "25px"}}>Average Temperature</Typography>
                </div>
                <div id="centerScreen">
                    {/* {console.log(data)} */}
                    {/* {console.log(data.reactors)} */}
                    {data.reactors && data.reactors.map((reactor, index) => {
                        // console.log(reactor)
                        return <ReactorTile key={index} reactor={reactor} url={url}/>
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
                <Button className="controlBoardBtnBlue" onClick={startReactors}>Start Reactors</Button>
            </section>
            <div className="toggleButtons">
                <Switch className="toggleSwitch" />
                <Switch className="toggleSwitch" />
            </div>
        </>
    )
}

export default Dashboard