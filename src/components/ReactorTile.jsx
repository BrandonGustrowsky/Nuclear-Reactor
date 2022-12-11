import { Paper, Typography } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReactorTile = (props) => {
    const { url } = props.url
    const { id, name, tempAmount, tempUnit } = props.reactor
    const navigate = useNavigate()

    return (
        <div className="reactorTileContainer" onClick={() => {
            console.log("called!")
            navigate(`/reactor/${id}`)
        }}>
            <Paper className="reactorTileChild" elevation={7} sx={{position: "relative"}}>
                <Typography sx={{fontSize: "25px", textAlign: "center", wordWrap: "wrap"}}> { name } </Typography>
                <Typography sx={{position: "absolute", bottom: "0px"}}> { tempAmount.toFixed(2) } ˚{ tempUnit == "celsius" ? "C" : "F" } </Typography>
            </Paper>
        </div>
    )
}

export default ReactorTile