import React, { useEffect } from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {FirestoreProvider} from "../contexts/FirestoreContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Account from "./Account";
import Menu from "./Menu"
import Navbar from "./NavbarComp";
import AddPlant from "./AddPlant";
import PlantInfo from "./PlantInfo";
import { messaging } from "../firebase";

function App() {

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  
  

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken();
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('An error occurred while requesting permission:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging.getToken({ vapidKey: 'BOksg-MXq3CnohBbl4dLFF-vWjH2YxNd9nmsvO-1U-HsiklkNVA85j64VZISECz3T5margRyIfPYRRsVt7bBUZw' });
      if (token) {
        console.log('Token received:', token);
        // Send the token to your server and save it for later use
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('An error occurred while retrieving token:', error);
    }
  };

  return (
    
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}
      >
        <div className="w-100" >
          <Router>
            <AuthProvider>
              <FirestoreProvider>
                <Routes>
                  <Route path="/signup" element={<Signup/>} />
                  <Route exact path='/' element={<PrivateRoute/>}>
                    <Route exact path='/' element={<Menu/>}/>
                  </Route>
                  <Route exact path='/dashboard' element={<PrivateRoute/>}>
                    <Route exact path='/dashboard' element={<Dashboard/>}/>
                  </Route>
                  <Route exact path='/update-profile' element={<PrivateRoute/>}>
                    <Route exact path='/update-profile' element={<UpdateProfile/>}/>
                  </Route>
                  <Route exact path='/account' element={<PrivateRoute/>}>
                    <Route exact path='/account' element={<Account/>}/>
                  </Route>
                  <Route exact path='/add-plant' element={<PrivateRoute/>}>
                    <Route exact path='/add-plant' element={<AddPlant/>}/>
                  </Route>
                  <Route exact path='/plant-info' element={<PrivateRoute/>}>
                    <Route exact path='/plant-info' element={<PlantInfo/>}/>
                  </Route>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </FirestoreProvider>
            </AuthProvider>
          </Router>
          
        </div>
      </Container>

    
    
    
  )
}

export default App;
