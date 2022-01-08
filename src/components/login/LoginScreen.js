import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";

import { types } from "../types/types";

export const LoginScreen = () => {
    


    //para mandar la accion
    const { dispatch }  = useContext( AuthContext );

    //useNavigate es una función que permite navegar a otras pantallas (Router-Dom V6)
    const navigate = useNavigate();

    const handleLogin = () => {


        //autenticando login y mandando la acción
        const action = {
            type: types.login,
            payload: { name:"Elliot Miranda" }//se tiene que ver en la navbar
        }

        dispatch(action);


        /*ahora que tenemos la última ruta guardada en lastPath (la guardamos al autenticarnos en PrivateRoute)
        , la usamos al loguearnos para que nos llevé allá */
        
        const lastPath = localStorage.getItem('lastPath') || '/marvel';

        /*navegamos a lastPath cuando demos click en login y el "replace" omite el login(o la ágina anterior) 
        del historial en cuanto le de al botón, osea, no podré volver con el botón de "atrás" */
        navigate( lastPath, {
            replace: true
        });
        
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick = { handleLogin }
            >
                Login
            </button>
        </div>
    )
}