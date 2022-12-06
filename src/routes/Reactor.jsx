import { useParams } from "react-router-dom"
import { useEffect } from "react"
const Reactor = () => {
    const BASE_URL = "https://nuclear.dacoder.io/reactors"
    const apiKey = "21a518c670a84119"
    const apiKeyLink = "?apiKey=" + apiKey
    const { id } = useParams("id")
    

    const getReactorData = async () => {
        //Coolant
        const rawCoolant = await fetch(BASE_URL + "/coolant/" + id + "" + apiKeyLink)
        const jsonCoolant = await rawCoolant.json()
        //Output
        const rawOutput = await fetch(BASE_URL + "/output/" + id + "" + apiKeyLink)
        const jsonOutput = await rawOutput.json()
        //Fuel level
        const rawFuelLevel = await fetch(BASE_URL + "/fuel-level/" + id + "" + apiKeyLink)
        const jsonFuelLevel = await rawFuelLevel.json()
        //Reactor State
        const rawState = await fetch(BASE_URL + "/reactor-state/" + id + "" + apiKeyLink)
        const jsonState = await rawState.json()
        // jsonState.state = "Online"
        //Rod State
        const rawRodState = await fetch(BASE_URL + "/rod-state/" + id + "" + apiKeyLink)
        const jsonRodState = await rawRodState.json()
    }

    useEffect(() => {
        getReactorData()
    }, [])
    
    return (
        <>
            <p>Reactor</p>
        </>
    )
}

export default Reactor