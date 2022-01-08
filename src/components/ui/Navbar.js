import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { types } from "../types/types";
import { AuthContext } from '../../auth/authContext';

export const Navbar = () => {


    //agarramos los datos de user del Context en HeroesApp.js (son 2 user, por eso también pongo user.name cuando lo desestructuro)
    const { user, dispatch }  = useContext( AuthContext );

    const navigate = useNavigate();

    const handleLogout = () => {

        console.log('Deslogueado paps')
        //ejecutamos la acción del logout
        const action = {
            type: types.logout,
        }
        dispatch(action);

        navigate('/login',{
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            {/* La version 6 de ReactRouterDom da error con el activeClassName de NavLink */}
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    {/* Ya no existe activeClassName en react-router-dom 6,
                    ahora el className puede ser tanto un String como un Arrow Func. que retorna un String,
                    tiene el prop de isActive como argumento, por tanto lo desestructuramos */}
                    
                    {/* El exact ya no existe... lo veremos a futuro */}
                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                        Bienvenido: { user.name }
                    </span>

                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}