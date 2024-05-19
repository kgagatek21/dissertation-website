import React, { useEffect, useRef, useState } from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarComp from './NavbarComp'
import { useFirestore } from '../contexts/FirestoreContext'
import { storage } from '../firebase'
import{ 
    ref,
    uploadBytes, 
    getDownloadURL
} from 'firebase/storage';

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
    const [selectedFile, setSelectedFile] = useState(null);

    

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


    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      
    };

    function returnToDashboard(){
        navigate("/dashboard")

    }


    function handleSubmit(e) {
        e.preventDefault()
       
        try{
            setError('')
            setMessage('')
            setLoading(true)

            const randomText = Math.random().toString(36).substring(2,7)
            const storageRef = ref(storage, 'plants/' + randomText + "_" + selectedFile.name);
            uploadBytes(storageRef, selectedFile).then((snapshot) => {
                // console.log('Uploaded a blob or file!');
    
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    // setUrl(downloadURL)
                    // console.log("state of url inside firestore context: " + url)
                    if(downloadURL === undefined){
                        console.log("downloadURL is undefined")
                    }else {
                        console.log("nickname ref: " + nicknameRef.current.value)
                        console.log("customScheduleRef ref: " + customScheduleRef.current.value)
                        console.log("plantTypeRef ref: " + plantTypeRef.current.value)
                        console.log("current user: " + currentUser.id)
                        console.log('File download URL:', downloadURL)
                        addPlant(
                            nicknameRef.current.value, 
                            plantTypeRef.current.value,
                            customScheduleRef.current.value,
                            currentUser.uid,
                            downloadURL
                        ).then((doc) => {
                            console.log("New doc id: " + doc.id)
                        }).catch((err) => {
                            console.log("New doc error" + err.message)
                        })
                    }
                });
            })
            .catch((err) => {
                console.log(err.message)
            })
        
            setMessage('Success, redirecting to dashboard')
            // navigate("/dashboard")
               
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
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Your Plant Image (Only '.png' files accepted)</Form.Label>
                        <Form.Control onChange={handleFileChange} accept='.png' type="file" />
                    </Form.Group>
                    
                    <Button disabled={loading} className='w-100 mb-3' type='submit'>Add</Button>
                    <Button disabled={loading} className='w-100 mb-3' onClick={returnToDashboard}>Return to Dashboard</Button>

                </Form>
            </Card.Body>
        </Card>
    </>
    
  )
}
