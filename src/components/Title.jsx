import { Button, TextField } from '@mui/material';
import { useState } from "react"

const Title = (props) => {
    const { text, url, plantName, setData } = props

    const [currPlantName, setCurrPlantName] = useState(plantName)
    const [isEditing, setIsEditing] = useState(false)

    const sendData = async (event) => {
        const { value } = event.target
        console.log(value)
        setIsEditing(false)
        try {
            const response = await fetch(url.BASE_URL + "/plant-name" + url.apiKeyLink, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                },
                body: JSON.stringify({
                    name: `${value}`
                })
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const updateTitle = (event) => {
        setIsEditing(true)
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="titleContainer">
                {isEditing ?
                    <TextField autoFocus className="titleInput" variant="filled" value={ isEditing ? currPlantName : plantName}
                        // onChange={(event) => { setData((prevData) => ({...prevData, "plant_name" : event.target.value})) }} onBlur={() => { setIsEditing(false) }}
                        onChange={(event) => { setCurrPlantName(event.target.value)}} onBlur={(event) => { sendData(event) }}
                        onKeyDown={(event) => { event.key === "Enter" ? sendData(event) : null }} />
                    :
                    <Button variant="text" onDoubleClick={(event) => { updateTitle(event) }} className="titleReadOnly">{plantName}</Button>
                }
            </div>
        </div>
    )
}

export default Title