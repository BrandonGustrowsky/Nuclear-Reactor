import { Paper, Typography } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReactorTile = (props) => {
    const { url } = props.url
    const { id, name, tempAmount, tempUnit, tempStatus, coolant, fuel, reactorState, rodStateIn, rodStateOut } = props.reactor
    const navigate = useNavigate()


    return (
        <div className="reactorTileContainer" onClick={() => {
            console.log("called!")
            navigate(`/reactor/${id}`)
        }}>
            <Paper className="reactorTileChild" elevation={7} sx={{ position: "relative" }}>
                <Typography sx={{ fontSize: "30px", textAlign: "center", wordWrap: "wrap" }}> {name} <span style={{ fontWeight: "bold", fontSize: "20px" }}>({reactorState})</span> </Typography>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Typography > Current Temperature: <span style={{ fontWeight: "bold" }}>{tempAmount.toFixed(2)} ˚{tempUnit == "celsius" ? "C" : "F"}</span> </Typography>
                    <Typography>Temperature Status: <span style={{ fontWeight: "bold" }}>{tempStatus}</span> </Typography>
                </div>
                <Typography>Fuel level: <span style={{fontWeight: "bold"}}>{fuel}%</span></Typography>
                <Typography>Coolant: <span style={{fontWeight: "bold"}}>{coolant}</span> </Typography>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Typography> <span style={{fontWeight: "bold"}}>{rodStateIn}</span> rods in, </Typography>
                    <Typography> <span style={{fontWeight: "bold"}}>{rodStateOut}</span> rods out</Typography>
                </div>
            </Paper>
        </div>
    )
}

export default ReactorTile