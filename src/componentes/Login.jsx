import React, {useState, useCallback} from "react";
import {auth, db} from '../firebase';
//Nota para que funciones agregamos un props al componente principal y envolvemos el componete dentro del withRouter
import { withRouter } from "react-router-dom";
import './login.css';

const Login = (props) => {
    //Constantes del formulario
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const [esRegistro, setEsRegistro] = useState(false)

    //Definir funcion de obtener datos
    const enviardatos = e =>{
        e.preventDefault()
        console.log(email)
        console.log(pass)

        if(!email.trim()){
            setError('Rellene el campo email')
            return
        }

        if(!pass.trim()){
            setError('Rellene el campo password')
            return
        }

        setError(null)

        //Comparativa para proceso registro o login
        if(esRegistro){
            //Crear una funcion para registrar
            registrar()
        }
        else{
            login1()
        }
    }

    //Incorporar un hook useCallBack
    const registrar = useCallback(async() => {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, pass) 
                console.log("Resultado del registro", res);

                //Crear una coleccion adicional a los usuarios para tener contro de sus datos
                await db.collection(res.user.uid).add({
                    name: 'Bienvenido',
                    fecha: Date.now()
                })

                setEmail('')
                setPass('')
                setError(null)

                props.history.push('/admin')

            } catch (error) {
                console.log(error);
                if(error.code === 'auth/invalid-email'){
                    setError('La dirección de correo electrónico está mal formateada')
                }

                if(error.code === 'auth/email-already-in-use'){
                    setError('La dirección de correo electrónico ya está siendo utilizada por otra cuenta.')
                }
            }
        },
        [email, pass]
    )

    const login1 = useCallback(async() => {
            try {
                const res = await auth.signInWithEmailAndPassword(email, pass)
                console.log("Resultado login", res.user)

                setEmail('')
                setPass('')
                setError(null)

                props.history.push('/admin')

            } catch (error) {
                console.log(error)
                if(error.code === 'auth/user-not-found'){
                    setError('No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.')
                }

                if(error.code === 'auth/wrong-password'){
                    setError('La contraseña no es válida o el usuario no tiene contraseña.')
                }
            }
        },
        [email, pass] //Nota el useCallback Requiere que los parametros usados se agregen en los corchetes finales
    )

    return (
        
        <div className="mt-5" >
            <br></br> <br></br>
            <h3 id="H3" className="text-center">
                {
                    esRegistro ? 'Registro de Usuario' : 'Login de Acceso'
                }   
            </h3>  
            
            <div className="row justify-content-center"  >

            <div className="col-12 col-sm-8 col-md-4 col-xl-4" id="backbox">
            
            <img id="imgA" src="avatr.png" alt="logo" className="mx-auto d-block" width="120" height="120"/>
                <br></br>
                    <form onSubmit={enviardatos}>
                        {
                            error ? (<div className="alert alert-warning">
                                        {error}
                                    </div>) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange = {e => setEmail(e.target.value)}
                            value= {email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña minimo 6 caracteres"
                            minlength="6"
                            onChange = {e => setPass(e.target.value)}
                            value= {pass}
                        />
                              <br></br>      <br></br>      <br></br>       <br></br>
                         <div className="d-grid">
                        <button id="btn1"
                            className="btn btn-danger btn-lg btn-block"
                            type="submit"
                        >
                            Ingresar
                        </button>
                        </div>
                        <br></br>
                        <div className="d-grid">
                        <button 
                            className="btn btn-lg btn-info btn-block"
                            type="button"
                            onClick = {() => setEsRegistro(!esRegistro)}
                        >
                            {
                                esRegistro ? '¿Ya Tienes Cuenta? ' : ' ¿No tienes cuenta?'
                            }
                        </button>
                        </div>

                    </form>
                    </div>
                </div>
            </div>
        
    )
}

export default withRouter (Login)