import { Paper, Typography } from '@mui/material';

const Title = (props) => {
    const { text } = props
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Paper elevation={3} className="titleContainer" >
                <Typography>{ text }</Typography>
            </Paper>
        </div>
        
    )
}

export default Title