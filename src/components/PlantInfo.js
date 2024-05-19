import React, { useEffect, useRef, useState } from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { useFirestore } from '../contexts/FirestoreContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavbarComp from './NavbarComp'


export default function PlantInfo() {
    const  {signup, currentUser}  = useAuth()
    const { getPlantType } = useFirestore()


    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState()
    const [atTime, setAtTime] = useState()
    const [plantType, setPlantType] = useState("")
    const [airTemp, setAirTemp] = useState("")
    const [airHumidity, setAirHumidity] = useState("")
    const [soilMoisture, setSoilMoisture] = useState("")
    const [lightIntensity, setLightIntensity] = useState("")
    
    const navigate = useNavigate()

    const location = useLocation();
    const plantData = location.state;

    useEffect(() => {
        const fireBaseTime = new Date(
            plantData.createdAt.seconds * 1000 + plantData.createdAt.nanoseconds / 1000000,
        );
        const date = fireBaseTime.toDateString();
        const atTime = fireBaseTime.toLocaleTimeString();
        setDate(fireBaseTime.toDateString())
        setAtTime(fireBaseTime.toLocaleTimeString())
            
        getPlantType(plantData.flowerTypeID).then((res) => {
            setPlantType(res.data())
            
        })

        if(plantData.isAirTooCold){
            setAirTemp("The air is too cold")
        }else if(plantData.isAirTooHot){
            setAirTemp("The air is too hot")
        }else if(plantData.isAirTooCold && plantData.isAirTooHot) {
            setAirTemp("error")
        }else {
            setAirTemp("The air has perfect temperature")
        }

        if(plantData.isAirTooHumid){
            setAirHumidity("The air is too humid")
        }else if(plantData.isAirTooDry){
            setAirHumidity("The air is too dry")
        }else if(plantData.isAirTooHumid && plantData.isAirTooDry) {
            setAirHumidity("error")
        }else{
            setAirHumidity("The air has perfect humidity")
        }
        
        
        if(plantData.isSoilTooDry){
            setSoilMoisture("The soil is too dry")
        }else {
            setSoilMoisture("The soil has perfect moisture level")
        }


        if(plantData.isLightTooIntense){
            setLightIntensity("The light is too intense")
        }else if(plantData.isLightNotEnough){
            setLightIntensity("There is not enough light")
        }else if(plantData.isLightTooIntense && plantData.isLightNotEnough){
            setLightIntensity("error")
        }else {
            setLightIntensity("The plant is getting a perfect amount of light")
        }
        
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            navigate("/dashboard")
        } catch (err) {
            
            console.log(err.message)
        }
        setLoading(false)
    }

  return (
    <>
        <NavbarComp className="mb-5"/>
        <Card className='mt-5'>
            <Card.Body>
                <h2 className='text-center mb-4'>Plant Info</h2>
                {error && <Alert variant='danger'>{error}</Alert>} 
                <Form onSubmit={handleSubmit}>
                    <Card.Img variant="top" src={plantData.imgUrl} />
                    <Form.Group id='nickname'>
                        <Form.Label className='mb-3 mt-3'>Nickname: {plantData.name}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mb-3'>Description: {plantType.description}</Form.Label>
                    </Form.Group>
                    <Form.Group id='species'>
                        <Form.Label className='mb-3'>Species: {plantType.speciesName}</Form.Label>
                    </Form.Group>
                    <Form.Group id='added-on'>
                        <Form.Label className='mb-3'>Added on: {date + " " + atTime}</Form.Label>
                    </Form.Group>
                    <Form.Group id='enviroment-factors'>
                        <Form.Label className='mb-3'>Air Temperature: {airTemp}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mb-3'>Air Humidity: {airHumidity}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mb-3'>Soil Moisture: {soilMoisture}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='mb-3'>Light Intensity: {lightIntensity}</Form.Label>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mb-3' type='submit'>Return to Dashboard</Button>
                    <Button disabled={loading} className='w-100' variant='danger' >Delete Plant</Button>

                </Form>
            </Card.Body>
        </Card>
        
    </>
    
  )
}
