import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarComp from './NavbarComp'

export default function Account() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try{
      await logout()
      navigate("/")
    } catch {
      setError('Failed to log out')
    }

  }
  
  return (
    <div style={{ maxWidth: '400px'}}>
        <NavbarComp />

        <Card>
            <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>
                Update Profile
            </Link>
            <Link onClick={handleLogout} className='btn btn-secondary w-100 mt-3'>
                Log Out
            </Link>
            </Card.Body>
        </Card>
               
      
      <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </div >
  )
}
