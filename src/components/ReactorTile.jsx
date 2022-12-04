import { Paper, Typography } from '@mui/material';

import { useState } from "react"


const ReactorTile = (props) => {
    const { url } = props.url
    const { id, name, tempAmount, tempUnit } = props.reactor
    const [temp, setTemp] = useState(0)

    return (
        <Paper elevation={7} style={{display: "flex", flexDirection: "column"}}>
            <Typography style={{fontSize: "35px", lineHeight: "140px"}}> { name } </Typography>
            <Typography> { tempAmount.toFixed(2) } ˚{ tempUnit == "celsius" ? "C" : "F" } </Typography>
        </Paper>
    )
}

export default ReactorTile