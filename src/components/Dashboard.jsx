import Title from "./Title"
import { Card, Typography, Button } from '@mui/material';

const Dashboard = () => {
    return (
        <>
            <Title text="Reactor Name" />
            {/* Main Screens */}
            <section className="panel">
                <div id="leftScreen">
                    <Typography style={{fontSize: "25px"}}>Average Temperature</Typography>
                </div>
                <div id="centerScreen">
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
        </>
    )
}

export default Dashboard