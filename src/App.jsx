import React from "react";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from "./componentes/Admin";
import Login from "./componentes/Login";
import Navbar from "./componentes/Navbar";
import {auth} from "./firebase"

function App() {
  
  const [firebaseUser, setFirebaseUser] = useState(false)

  //recibir el estado de un usuario con onAuthStateChange
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("Usuario esta como", user)
      if(user){
        setFirebaseUser(user)
      }
      else{
        setFirebaseUser(null)
      }
    })
  })

  return firebaseUser !== false ? (
    
      <Router>
        <div className="container">
          <Navbar firebaseUser = {firebaseUser}/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            /*Ruta Pagina Principal*/
            <Route path="/" exact>
              
            </Route>
          </Switch>
        </div>
        
      </Router>
      
  ) : (
    
    <p className="text-center">Cargando..</p>
  )
}

export default App;