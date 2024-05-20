import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { storage } from '../firebase';
import {
    collection, 
    doc,
    getDoc,
    addDoc, 
    serverTimestamp,
    getDocs,
    query, 
    where,
    deleteDoc,
    updateDoc
}from 'firebase/firestore';
import{ 
    ref,
    uploadBytes, 
    getDownloadURL
} from 'firebase/storage';

const FirestoreContext = React.createContext()

export function useFirestore() {
    return useContext(FirestoreContext)
}

export function FirestoreProvider({ children }) {
//   const [ currentUser ] = useAuth()
    const [url, setUrl] = useState();


    async function uploadStorageImg(img){
        const randomText = Math.random().toString(36).substring(2,7)
        const storageRef = ref(storage, 'plants/' + randomText + "_" + img.name);
        await uploadBytes(storageRef, img).then((snapshot) => {
            // console.log('Uploaded a blob or file!');

            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File download URL:', downloadURL)
                // setUrl(downloadURL)
                // console.log("state of url inside firestore context: " + url)
                if(downloadURL === undefined){
                    console.log("downloadURL is undefined")
                }else {
                    console.log("Returning downloadURL")
                    return downloadURL
                }
            });
        })

        

    }

  function addPlant(name, plantTypeId, customSchedule, ownerID, url) {
    const colRefPlants = collection(db, 'plants')
    return addDoc(colRefPlants, {
        name: name,
        flowerTypeID: plantTypeId,
        isAirTooCold: false,
        isAirTooHot: false,
        isAirTooHumid: false,
        isCustomSchedule: customSchedule,
        ownerID: ownerID,      
        createdAt: serverTimestamp(),
        imgUrl: url
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

  function deletePlant(plantID) {
    const docRef = doc(db, 'plants', plantID)
    return deleteDoc(docRef)
  }

  function triggerIrrigation(plantID) {
    const docRef = doc(db, 'plants', plantID)
    return updateDoc(docRef, {
        irrigationTrigger: true
    })
  }
  

  const value = { 
    addPlant,
    fetchPlantTypes,
    getPlants,
    getPlantType,
    uploadStorageImg,
    deletePlant,
    triggerIrrigation
  }
    return (
    <FirestoreContext.Provider value={value}>
        {children}
    </FirestoreContext.Provider>
  )
}
