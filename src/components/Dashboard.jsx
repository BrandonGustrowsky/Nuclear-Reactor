import Title from "./Title"
import { Card, Typography } from '@mui/material';

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
        </>
    )
}

export default Dashboard