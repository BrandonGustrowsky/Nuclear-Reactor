import { Button, fabClasses, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react"
import { useSnackbar } from 'notistack';


const Title = (props) => {
    const { url, name, setData } = props

    const [currName, setCurrName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    const [hasBeenUpdated, setHasBeenUpdated] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const sendData = async (event) => {
        const { value } = event.target
        console.log(value)
        if (value.length < 25) {
            try {
                const response = await fetch(url.BASE_URL + "" + url.endpoint + "" + url.apiKeyLink, {
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
                    setCurrName(value)
                    setHasBeenUpdated(true)
                    console.log("Ran")
                } else {
                    console.log("Plant name cannot be empty")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            enqueueSnackbar("Name must be less than 25 characters")
        }
        
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} id="titleParent">
            <div className="titleContainer">
                {isEditing ?
                    <TextField autoFocus className="titleInput" variant="filled" value={(isEditing ? (currName ? currName : name) : name)}
                        onChange={(event) => { setCurrName(event.target.value) }}
                        onBlur={(event) => { sendData(event) }}
                        onKeyDown={(event) => { event.key === "Enter" ? sendData(event) : null }} />
                    :
                    // <div id="titleReadOnlyParent" style={{position: "relative", width: "100%", alignItems: "center"}}>
                    <div id="titleReadOnlyParent">
                        <Typography className="titleReadOnly"> {hasBeenUpdated ? `${currName}` : `${name}`}</Typography>
                        <EditIcon id="editTitle" onClick={() => { setIsEditing(true) }} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Title