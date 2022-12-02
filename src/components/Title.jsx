import { Button, TextField } from '@mui/material';
import { useState } from "react"

const Title = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState("Reactor Name")
    const { text } = props
    const BASE_URL = "https://nuclear.dacoder.io/reactors"
    const apiKey = "21a518c670a84119"
    const apiKeyLink = "?apiKey=" + apiKey

    const updateTitle = async (event) => {
        const { value } = event.target
        setIsEditing(true)
        const postTitle = await fetch(BASE_URL + "/plant-name/" + apiKeyLink, {
            method: "PUT",
            body: JSON.stringify({
                title : value
            })
        }).then((response) => {
            response.json().then((response) => {
              console.log(response);
            })
          }).catch(err => {
            console.error(err)
          })
        
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="titleContainer">
                {isEditing ? 
                    <TextField autoFocus className="titleInput" variant="filled" value={value} 
                        onChange={(event) => {setValue(event.target.value)}} onBlur={() => {setIsEditing(false)}} 
                        onKeyDown={(event) => {event.keyCode === 13 ? setIsEditing(false) : null}}/>
                    :
                    <Button variant="text" onDoubleClick={(event) => { updateTitle(event) }} className="titleReadOnly">{ value }</Button>
                }
            </div>
        </div>
    )
}

export default Title