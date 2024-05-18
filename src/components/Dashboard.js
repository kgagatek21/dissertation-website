// import React, { useState } from 'react'
// import { Alert, Button, Card } from 'react-bootstrap'
// import { useAuth } from '../contexts/AuthContext'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Dashboard() {
//   const [error, setError] = useState("")
//   const { currentUser, logout } = useAuth()
//   const navigate = useNavigate()

//   async function handleLogout() {
//     setError('')

//     try{
//       await logout()
//       navigate("/")
//     } catch {
//       setError('Failed to log out')
//     }

//   }
  
//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className='text-center mb-4'>Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <strong>Email:</strong> {currentUser.email}
//           <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>
//             Update Profile
//           </Link>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//           <Button variant="link" onClick={handleLogout}>Log Out</Button>
//       </div>
//     </>
//   )
// }


import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, CardGroup } from 'react-bootstrap'
import NavbarComp from './NavbarComp'
import { useFirestore } from '../contexts/FirestoreContext'
import { useAuth } from '../contexts/AuthContext'
import { json } from 'react-router-dom'

export default function Dashboard() {
  const [plants, setPlants] = useState([])
  const [plantType, setPlantType] = useState('')

  const { getPlants, getPlantType, fethPlantTypes } = useFirestore()
  const { currentUser } = useAuth()

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

    // async function getImgUrl(plantTypeID){
    //   await getPlantType(plantTypeID).then((doc) => {
    //     const json = doc.data().imgUrl
    //     // console.log(plantType)
    //     // return String(doc.data().imgUrl)
    //     return doc.data().imgUrl
    //   })
    //   setPlantType(json)
      
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
                  <Button variant="primary">Settings</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        ))}
      </div>
    </>
    
      
  )
}

