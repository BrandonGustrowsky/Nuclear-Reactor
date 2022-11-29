import Title from "./Title"
import { Card, Typography, Button, IconButton, Switch } from '@mui/material';
// import ToggleOnOutlined from '@material-ui/icons/ToggleOnOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from "react"

const Dashboard = (props) => {
    const { reactors } = props
    const [plantName, setPlantName] = useState("")

    return (
        <>
            <Title text="Reactor Name"/>
            {/* Main Screens */}
            <section className="panel">
                <div id="leftScreen">
                    <Typography style={{fontSize: "25px"}}>Average Temperature</Typography>
                </div>
                <div id="centerScreen">
                    {console.log(reactors.length)}
                    {reactors.length > 0 && reactors.map((reactor) => {
                        return <div>{reactor.name}</div>
                    })}
                    {/* <Typography style={{fontSize: "25px"}}>Average Temperature</Typography> */}
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