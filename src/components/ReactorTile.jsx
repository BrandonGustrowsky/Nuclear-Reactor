import { Paper, Typography } from '@mui/material';

import { useState } from "react"


const ReactorTile = (props) => {
    const { apiKey } = props
    const { id, name } = props.reactor
    const [temp, setTemp] = useState(0)

    console.log("https://nuclear.dacoder.io/reactors/temperature/"+id+"?apiKey="+apiKey)

    const getTemperatures = async () => {
        const rawTemperature = await fetch("https://nuclear.dacoder.io/reactors/temperature/"+id+"?apiKey="+apiKey)
        const temperature = await rawTemperature.json()
        setTemp(temperature)
    }

    getTemperatures()

    return (
        <Paper elevation={7}>
            <Typography> { name } </Typography>
            <Typography> { temp.amount } ˚{ temp.unit == "celsius" ? "C" : "F" } </Typography>
        </Paper>
    )
}

export default ReactorTile