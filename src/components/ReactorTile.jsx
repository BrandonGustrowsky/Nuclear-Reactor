import { Paper, Typography } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReactorTile = (props) => {
    const { url } = props.url
    const { id, name, tempAmount, tempUnit } = props.reactor
    const navigate = useNavigate()

    return (
        <div onClick={() => {
            console.log("called!")
            navigate(`/reactor/${id}`)
        }}>
            <Paper elevation={7} style={{display: "flex", flexDirection: "column"}}>
                <Typography style={{fontSize: "35px", lineHeight: "140px"}}> { name } </Typography>
                <Typography> { tempAmount.toFixed(2) } ˚{ tempUnit == "celsius" ? "C" : "F" } </Typography>
            </Paper>
        </div>
    )
}

export default ReactorTile