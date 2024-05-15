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


import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'


export default function Dashboard() {
  const plants = [
    "../images/plant_2.jpg",

  ]

  const plant = [
  {
    "name": "Monstera",
    "img": 'plant_1.png'
  },
  {
    "name": "other plant",
    "img": 'plant_2.png'
  }]

  return (
    plant.map((variant) => (
      <Card style={{ width: '18rem' }} 
      key="dark"
      className="mb-2"
      >
      <Card.Img variant="top" src={require("../images/" + variant.img)} />
      <Card.Body>
        <Card.Title>Nice Plant</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card>
    )
  ))
}

