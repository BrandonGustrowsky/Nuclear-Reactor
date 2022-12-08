import { Button, fabClasses, TextField } from '@mui/material';
import { useEffect, useState } from "react"

const Title = (props) => {
    const { url, plantName, setData } = props

    const [currPlantName, setCurrPlantName] = useState(plantName)
    const [isEditing, setIsEditing] = useState(false)
    const [hasBeenUpdated, setHasBeenUpdated] = useState(false)

    const sendData = async (event) => {
        const { value } = event.target
        console.log(value)
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
            if (response.status == 200) {
                console.log(response)
                setIsEditing(false)
                setHasBeenUpdated(true)
                console.log("Ran")
            } else {
                console.log("Plant name cannot be empty")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="titleContainer">
                {isEditing ?
                    <TextField autoFocus className="titleInput" variant="filled" value={ (isEditing ? (currPlantName ? currPlantName : plantName) : plantName) }
                        // onChange={(event) => { setData((prevData) => ({...prevData, "plant_name" : event.target.value})) }} onBlur={() => { setIsEditing(false) }}
                        onChange={(event) => { setCurrPlantName(event.target.value)}}
                        onBlur={(event) => { sendData(event) }}
                        onKeyDown={(event) => { event.key === "Enter" ? sendData(event) : null }} />
                    :
                    <Button variant="text" onDoubleClick={() => { setIsEditing(true) }} className="titleReadOnly">{ hasBeenUpdated ? currPlantName : plantName }</Button>
                }
            </div>
        </div>
    )
}

export default Title