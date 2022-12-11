import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Title from "../components/Title"
import { Typography, Button, Paper } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import Graph from "../components/Graph"
const Reactor = () => {
    const pollingRate = 150
    const [data, setData] = useState({})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const BASE_URL = "https://nuclear.dacoder.io/reactors"
    const apiKey = "21a518c670a84119"
    const apiKeyLink = "?apiKey=" + apiKey
    const { id } = useParams("id")
    const url = { BASE_URL: BASE_URL, apiKeyLink: apiKeyLink, endpoint: `/set-reactor-name/${id}` }
    const navigate = useNavigate()

    // Call this function when the user clicks the "Emergency Shutdown" button
    const activateEmergencyShutdown = async () => {
        const response = await fetch(BASE_URL + "/emergency-shutdown/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
        })
        if (response.status === 201) {
            enqueueSnackbar("Emergency shutdown complete")
        } else {
            const text = await response.text()
            enqueueSnackbar(text)
        }
    }

    // Call this function when the user clicks the "Controlled Shutdown" button
    const activateControlledShutdown = async () => {
        const response = await fetch(BASE_URL + "/controlled-shutdown/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        if (response.status === 201 || response.status === 304) {
            enqueueSnackbar(`${data.reactorName} was successfully shut down`)
        } else {
            const text = await response.text()
            enqueueSnackbar(text)
        }
    }

    // Call this function when the user tries to drop a rod in the reactor
    const activateDropRod = async () => {
        if (data.reactorState === "Active") {
            const dropRod = await fetch(BASE_URL + "/drop-rod/" + id + "" + apiKeyLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
        } else {
            enqueueSnackbar("Reactor must be active")
        }
    }

    // Call this function when the user tries to raise a rod in the reactor
    const activateRaiseRod = async () => {
        if (data.reactorState === "Active") {
            const raiseRod = await fetch(BASE_URL + "/raise-rod/" + id + "" + apiKeyLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
        } else {
            enqueueSnackbar("Reactor must be active")
        }
    }

    // Call this function when the user attempts to put the reactor into maintenance mode
    const activateMaintenance = async () => {
        const response = await fetch(BASE_URL + "/maintenance/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })

        const text = await response.text()
    }

    // Call this function when the user attempts to refuel the reactor
    const activateRefuel = async () => {
        activateMaintenance()
        console.log(BASE_URL + "/refuel/" + id + "" + apiKeyLink)
        const response = await fetch(BASE_URL + "/refuel/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        if (response.status === 201 || response.status === 304) {
            enqueueSnackbar(`${data.reactorName} has been successfully refueled`)
        } else {
            const text = await response.text()
            enqueueSnackbar(text)
        }
    }

    // Call this function when the user attempts to change the coolant for the reactor
    const activateToggleCoolant = async () => {
        if (data.reactorState === "Active") {
            const rawCoolant = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink)
            const jsonCoolant = await rawCoolant.json()
            const coolant = jsonCoolant.coolant
            const newCoolant = (coolant === "on" ? "off" : "on")
            console.log(newCoolant)
            const response = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    coolant: newCoolant,
                }),
            })
            if (response.status === 201 || response.status === 304) {
                enqueueSnackbar(`The coolant has been toggled ${newCoolant}`)
            } else {
                const text = response.text()
                enqueueSnackbar(text)
            }
        } else {
            enqueueSnackbar("Reactor must be started to modify coolant state")
        }

    }

    // Call this function when the user attempts to start the reactor
    const activateStartReactor = async () => {
        activateRefuel()
        const response = await fetch(BASE_URL + "/start-reactor/" + id + "" + apiKeyLink, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
        })
        if (response.status === 201 || response.status === 304) {
            enqueueSnackbar(`${data.reactorName} has been started!`)
        } else {
            const text = await response.text()
            enqueueSnackbar(text)
        }
    }

    const buildReactor = async () => {
        //Get reactor name
        const rawReactorArray = await fetch(`${BASE_URL}${apiKeyLink}`)
        const jsonRawReactorArray = await rawReactorArray.json()
        const theReactorAsArray = jsonRawReactorArray.reactors.filter((reactor) => {
            return reactor.id === id
        })

        // Get temperature data
        const rawTemperature = await fetch(BASE_URL + "/temperature/" + id + "" + apiKeyLink)
        const jsonTemperature = await rawTemperature.json()

        // Get coolant data
        const rawCoolant = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink)
        const jsonCoolant = await rawCoolant.json()

        // Get output data
        const rawOutput = await fetch(BASE_URL + "/output/" + id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()

        // Get fuel level data
        const rawFuelLevel = await fetch(BASE_URL + "/fuel-level/" + id + "" + apiKeyLink)
        const jsonFuelLevel = await rawFuelLevel.json()

        // Get reactor state data
        const rawReactorState = await fetch(BASE_URL + "/reactor-state/" + id + "" + apiKeyLink)
        const jsonReactorState = await rawReactorState.json()

        // Get rod state data
        const rawRodState = await fetch(BASE_URL + "/rod-state/" + id + "" + apiKeyLink)
        const jsonRodState = await rawRodState.json()

        setData({
            reactorName: theReactorAsArray[0].name,
            tempAmount: jsonTemperature.temperature.amount,
            tempUnit: jsonTemperature.temperature.unit,
            tempStatus: jsonTemperature.temperature.status,
            coolant: jsonCoolant.coolant,
            outputAmount: jsonOutput.output.amount,
            outputUnit: jsonOutput.output.unit,
            fuelLevel: jsonFuelLevel.fuel,
            reactorState: jsonReactorState.state,
            rodStateIn: jsonRodState.control_rods.in,
            rodStateOut: jsonRodState.control_rods.out,
        })
    }

    const onEnterDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            //call submit function here
            handleSubmit(event);
            console.log('Enter KEY was pressed')
            }
        }
    
    
    useEffect(() => {
        const id = setInterval(buildReactor, pollingRate) //On mount
        return () => { clearInterval(id) }  //On component dismount
    }, [])

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    const handleSubmit = (event) => {
        
        console.log('form submitted');

        if (!parseInt(event.target.value)) {
            enqueueSnackbar("Input must be an integer")
        }
        for (let i = 0; i < parseInt(event.target.value); ++i){
            console.log("In for loop")
            if (event.target.name == "removeRod"){
                activateRaiseRod();
            }
            if (event.target.name == "dropRod"){
                activateDropRod();
            }
            }
        event.target.value = ''
        }
    useEffect(() => {
        const keyDownHandler = event => {
        console.log('User pressed: ', event.key);
        
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);



    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <header>
                <Title url={url} name={data.reactorName} setData={setData} />
                <Button variant="text" style={{ position: "absolute", right: "0", top: "25px" }} onClick={() => {
                    navigate("/")
                }}><CloseIcon id="closeBtn" /></Button>
            </header>
            <main id="reactorMainContent">
                <Typography variant="h1" style={{ fontSize: "25px" }}>Reactor State: <span style={{ fontWeight: "600" }}>{data.reactorState}</span></Typography>
                <Typography variant="h2" style={{ fontSize: "25px" }}>Coolant: {data.coolant}</Typography>
                <section>
                    <div className="rodStateContainer">
                        <Typography>Rod State: In: {data.rodStateIn}</Typography>
                        <input type="text" id="first" name="dropRod" onChange={event => setFirst(event.target.value)} autoComplete="off" onKeyDown={event => onEnterDown(event)}/>
                    </div>
                    <div className="rodStateContainer">
                        <Typography>Rod State: Out: {data.rodStateOut}</Typography>
                        <input type="text" id="last" name="removeRod" onChange={event => setLast(event.target.value)} autoComplete="off" onKeyDown={event => onEnterDown(event)}/>
                    </div>
                </section>
                <div id="graphContainer">
                    <Typography variant="h3" style={{ fontSize: "25px", textAlign: "center" }}>Current Temperature: {Number(data.tempAmount).toFixed(2)} ˚{data.tempUnit === "celsius" ? "C" : "F"}</Typography>
                    <Graph data={data} width="200px" height="250px" temperature={data.tempAmount} pollingRate={pollingRate} />
                </div>
                <Typography>Level: {data.tempStatus}</Typography>
                <Typography>Output: {data.outputAmount} {data.outputUnit} </Typography>
                <section id="reactorActionsContainer">
                    <div className="reactorActions">
                        <Button className="reactorShutdownBtn" onClick={activateEmergencyShutdown}></Button>
                        <Typography>Emergency Shutdown</Typography>
                    </div>
                    <div className="reactorActions">
                        <Button className="reactorShutdownBtn" onClick={activateControlledShutdown}></Button>
                        <Typography>Controlled Shutdown</Typography>
                    </div>
                    <div className="reactorActions">
                        <Button className="reactorShutdownBtn" onClick={activateRefuel}></Button>
                        <Typography>Refuel Reactor</Typography>
                    </div>
                    <div className="reactorActions">
                        <Button className="reactorShutdownBtn" onClick={activateToggleCoolant}></Button>
                        <Typography>Toggle Coolant</Typography>
                    </div>
                    <div className="reactorActions">
                        <Button className="reactorShutdownBtn" onClick={activateStartReactor}></Button>
                        <Typography>Start Reactor</Typography>
                    </div>
                </section>
                <section>
                </section>
            </main>
        </div>
    )
}

export default Reactor