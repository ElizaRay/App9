import React, {useState, useEffect} from 'react'
import {auth} from '../firebase'
import { withRouter } from 'react-router-dom'
//import Borrar from './Borrar'
import './Admin.css';
import CRUD from './Crud'
function Admin(props) {
    const [user, setUser] = useState(null)

    //llamar al usuario logeado
    useEffect(() => {
        if(auth.currentUser){
            console.log('Usuario activo')
            setUser(auth.currentUser)
        }
        else{
            console.log('Usuario inactivo')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h1  className="text-center">Administracion de Tareas</h1>
            {
                user && (
                    <CRUD user={user}/>
                )
            }
        </div>
    )
}

export default withRouter (Admin)