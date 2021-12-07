import React from "react";
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {

    const cerrarSesion = () =>{
        auth.signOut().then(() =>{
            props.history.push('/login')
        })
    }

    return (
        <div className="container-fluid">
        <div className="navbar  navbar-expand-lg bg-dark navbar-dark fixed-top">
            <Link to="/" className="navbar-brand"><img src="l1.png" alt="logo" width="30" height="30"/> React Home</Link>
            
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-4" 
                        to="/"
                        exact
                    >
                             Inicio
                    </NavLink>
                    {
                        props.firebaseUser !== null ? (
                            <NavLink 
                            className="btn btn-dark mr-4" 
                            to="/admin"
                            >
                                  Administrador
                            </NavLink>
                        ) : null 
                    }
                    {
                        props.firebaseUser !== null ? (
                            <button className = "btn btn-dark"
                            onClick={() => cerrarSesion()}>
                                    Log Out
                            </button>
                        ) : (
                            <NavLink 
                            className="btn btn-dark" 
                            to="/login"
                            >
                                     Log In
                            </NavLink>
                        )
                    }
                   
                    </div>
                    
                </div>
                <div class="collapse navbar-collapse" id="mynavbar"></div>
                <form class="d-flex">
                        <input class="form-control me-2" type="text" placeholder="Search"/>
                        <button class="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                </form>
            </div>
        </div>
    )
}

export default withRouter (Navbar)