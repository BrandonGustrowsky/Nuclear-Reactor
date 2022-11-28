import { Button, TextField } from '@mui/material';
import { useState } from "react"

const Title = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState("Reactor Name")
    const { text } = props

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="titleContainer">
                {isEditing ? 
                    <TextField autoFocus className="titleInput" variant="filled" value={value} 
                        onChange={(event) => {setValue(event.target.value)}} onBlur={() => {setIsEditing(false)}} 
                        onKeyDown={(event) => {event.keyCode === 13 ? setIsEditing(false) : null}}/>
                    :
                    <Button variant="text" onDoubleClick={() => {setIsEditing(true)}} className="titleReadOnly">{ value }</Button>
                }
            </div>
        </div>
    )
}

export default Title