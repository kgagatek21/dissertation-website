import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()


  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email)
  }

  function changeEmail(email){
    return updateEmail(currentUser, email)
  }

  function changePassword(password){
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  

  const value = { 
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    changeEmail,
    changePassword
  }
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
