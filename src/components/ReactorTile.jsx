import { Paper, Typography } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReactorTile = (props) => {
    const { url } = props.url
    const { id, name, tempAmount, tempUnit } = props.reactor
    const navigate = useNavigate()

    return (
        <div className="reactorTileContainer" style={{background: "transparent"}} onClick={() => {
            console.log("called!")
            navigate(`/reactor/${id}`)
        }}>
            <Paper className="reactorTileChild" elevation={7}>
                <Typography style={{fontSize: "35px", lineHeight: "140px"}}> { name } </Typography>
                <Typography> { tempAmount.toFixed(2) } ˚{ tempUnit == "celsius" ? "C" : "F" } </Typography>
            </Paper>
        </div>
    )
}

export default ReactorTile