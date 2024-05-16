import React, { useEffect, useRef, useState } from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarComp from './NavbarComp'
import { useFirestore } from '../contexts/FirestoreContext'


export default function AddPlant() {
    const nicknameRef = useRef()
    const plantTypeRef = useRef()
    const customScheduleRef = useRef()

    const  {signup, currentUser}  = useAuth()
    const  {addPlant, fetchPlantTypes}  = useFirestore()

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [loading, setLoading] = useState(false)
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [listing, setListing] = useState([])

    

    const handleSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
    };

    const navigate = useNavigate()




    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await fetchPlantTypes();
            const json = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setListing(json);
        };

        fetchData();
    }, []);


        // await fetchPlantTypes().then((snapshot) => {
        //     let plantTypes = []
        //     snapshot.docs.forEach((doc) => {
        //       plantTypes.push({ ...doc.data(), id: doc.id })
        //     })
        //     console.log(plantTypes)
        //     return plantTypes
        //   })
        //   .catch(err => {
        //     console.log(err.message)
        // })
    

    async function handleSubmit(e) {
        e.preventDefault()
       
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await addPlant(
                nicknameRef.current.value, 
                plantTypeRef.current.value,
                customScheduleRef.current.value,
                currentUser.uid
                )
            setMessage('Success, redirecting to dashboard')
            navigate("/dashboard")
            // await addPlant("biig", "PJhNjTUmWItjkWRLyqhJ", false)
            
        } catch (err) {
            setError('Failed to add a plant')
            console.log(err.message)
        }
        setLoading(false)
    }

  return (
    <>
        <NavbarComp />
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>New Plant</h2>
                <h4 className='text-center mb-4'>Add a new plant to your account</h4>
                {error && <Alert variant='danger'>{error}</Alert>} 
                {message && <Alert variant='success'>{message}</Alert>} 

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" id='Nickname'>
                        <Form.Label>Plant Nickname</Form.Label>
                        <Form.Control type='name' ref={nicknameRef} required/>
                    </Form.Group>
                    <Form.Group id='plantType'>
                        <Form.Label>Plant Type</Form.Label>
                        <Form.Select ref={plantTypeRef} aria-label="Default select example">
                            <option>Select Plant Type</option>
                            {listing.map((variant) => (
                                <option value={variant.id}>{variant.speciesName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check 
                            type="switch"
                            id="customScheduleSwitch"
                            label="Custom Schedule"
                            className='mb-3 mt-3'
                            onChange={handleSwitchChange}

                        />
                        <Form.Select 
                            className='mb-3' 
                            disabled={!isSwitchChecked}
                            aria-label="Default select example"
                            ref={customScheduleRef}
                            >
                            <option>Select Frequency</option>
                            <option value="1">Once a day</option>
                            <option value="2">Once a week</option>
                            <option value="3">Once every two weeks</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Button disabled={loading} className='w-100' type='submit'>Add</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
    
  )
}
