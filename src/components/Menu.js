import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
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
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Menu</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Link to="/account" className='btn btn-primary w-100 mt-3'>
            Account
          </Link>
          <Link to="/dashboard" className='btn btn-primary w-100 mt-3'>
            Dashboard
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}


