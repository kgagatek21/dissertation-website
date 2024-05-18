import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
// import { useAuth } from './AuthContext' 
import {
    collection, 
    doc,
    getDoc,
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

  function getPlantType(typeID){ 
    const docRef = doc(db, 'plantTypes', typeID)
    return getDoc(docRef)
  }
  

  function getPlants(userID){
    const colRefPlants = collection(db, 'plants')
    const q = query(colRefPlants, where('ownerID', '==', '' + userID)) // no idea why but where() would not accept {userID}, so had to do a work around
    // console.log(userID)
    return getDocs(q)
  }
  

  const value = { 
    addPlant,
    fetchPlantTypes,
    getPlants,
    getPlantType
  }
    return (
    <FirestoreContext.Provider value={value}>
        {children}
    </FirestoreContext.Provider>
  )
}
