import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
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

function App() {
  return (
    
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}
      >
        <div className="w-100" >
          <Router>
            <AuthProvider>
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
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
          
        </div>
      </Container>

    
    
    
  )
}

export default App;
