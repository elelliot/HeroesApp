import React from 'react'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';




//children es una prop que agrupa todos los hijos de un higher order component en un arreglo
export const PrivateRoute = ({ children }) => {
    
    const { user } = useContext(AuthContext);
    


    //GUARDANDO LA ÚLTIMA PÁGINA VISITADA
    //con el location (lo desestructuramos por eso no se ve) accedemos a la ubicacion y la guardamos en el localstorage
    const { pathname, search } = useLocation();
    // console.log(location)
    
    //cada que cambiemos de ruta, se guarda en localStorage , con todo y busqueda
    localStorage.setItem('lastPath' , pathname + search);
    
    /*si el user ta logueado, renderiza children, si no lo redireccionamos, pero como necesitamos regresar un componente,
    usamos el componente Navigate*/
    /*Si estás logueado, vete a children, si no, a login*/
    return user.logged
        ? children
        : <Navigate to="/login" />
}
