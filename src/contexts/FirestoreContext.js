import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
// import { useAuth } from './AuthContext' 
import {
    collection, 
    addDoc, 
    serverTimestamp,
    getDocs,
    query, 
    where,
    onSnapshot
  }from 'firebase/firestore'

const FirestoreContext = React.createContext()

export function useFirestore() {
    return useContext(FirestoreContext)
}

export function FirestoreProvider({ children }) {
//   const [ currentUser ] = useAuth()


  function addPlant(name, plantTypeId, customSchedule, ownerID) {
    const colRefPlants = collection(db, 'plants')
    return addDoc(colRefPlants, {
        name: name,
        flowerTypeID: plantTypeId,
        isAirTooCold: false,
        isAirTooHot: false,
        isAirTooHumid: false,
        isCustomSchedule: customSchedule,
        ownerID: ownerID,      
        createdAt: serverTimestamp()
      })
  }

  function fetchPlantTypes(){
    const colRefPlantTypes = collection(db, 'plantTypes')
    return getDocs(colRefPlantTypes)
  }
  

  function getPlants(userID){
    const colRefPlants = collection(db, 'plants')
    const q = query(colRefPlants, where("ownerID", "==", {userID}))
    return getDocs(q)
  }
  

  const value = { 
    addPlant,
    fetchPlantTypes,
    getPlants
  }
    return (
    <FirestoreContext.Provider value={value}>
        {children}
    </FirestoreContext.Provider>
  )
}
