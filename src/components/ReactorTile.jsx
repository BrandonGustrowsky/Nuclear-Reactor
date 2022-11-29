import { Paper, Typography } from '@mui/material';

import { useState } from "react"


const ReactorTile = (props) => {
    const { apiKey } = props
    const { id, name, tempAmount, tempUnit } = props.reactor
    const [temp, setTemp] = useState(0)

    return (
        <Paper elevation={7}>
            <Typography> { name } </Typography>
            <Typography> { tempAmount } ˚{ tempUnit == "celsius" ? "C" : "F" } </Typography>
        </Paper>
    )
}

export default ReactorTile