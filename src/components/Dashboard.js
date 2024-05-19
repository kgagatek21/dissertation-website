import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, CardGroup } from 'react-bootstrap'
import NavbarComp from './NavbarComp'
import { useFirestore } from '../contexts/FirestoreContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom"
import { json } from 'react-router-dom'

export default function Dashboard() {
  const [plants, setPlants] = useState([])
  const [currentPlant, setCurrentPlant] = useState('')

  const { getPlants, getPlantType, fethPlantTypes } = useFirestore()
  const { currentUser } = useAuth()

  const navigate = useNavigate()


  useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getPlants(currentUser.uid);
        const json = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setPlants(json); 
        // console.log(plants)
      }

      fetchData();

  }, []);

  function handleClick(plantData){
    navigate("/plant-info", {state: plantData})
  }

  // const handleClick = () => {

  // }

  return (
    <>
      <NavbarComp />
      <div className='row'>
        {plants.map((plant) => ( 

          <div className='col-md-3'>
            <CardGroup>
              <Card  className='mb-3 mt-3'>
                  <Card.Img variant="top" src={plant.imgUrl} />
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <Card.Text>{plant.description}</Card.Text>
                  <Button variant="primary" onClick={ () => handleClick(plant)}>Settings</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        ))}
      </div>
    </>
    
      
  )
}

