import { useEffect, useReducer } from "react"
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";

import { AppRouter } from "./routers/AppRouter"


export const HeroesApp = () => {
    /*useReducer son:
        dispatch se usa para disparar acciones al reducer( en este caso el authReducer ), 
        state es el argumento del authReducer (le podemos cambiar de nombre , en este caso "user").
        
        y necesita como parametros un reducer, un estado inicial y
        el init es una forma de inicializar el estado inicial
        que se puede hacer fuera del mismo para que solo se ejecute la primera vez */
    
        //si está logeado, guardamos el user en el local storage y si no, regresa false
    const init = () => {
        return JSON.parse( localStorage.getItem('user') )|| { logged: false };
    }
    const [ user, dispatch ] = useReducer( authReducer, {}, init );
    
    

    /*Como el user se borra al actualizar después de logearse, hay que grabar el user en el localstorage
    le estamos indicando a React que el componente tiene que hacer algo después de renderizarse.
    React recordará la función que le hemos pasado (nuestro “efecto”)
    y la llamará más tarde después de actualizar el DOM.
    Por defecto se ejecuta después del primer renderizado y después de cada actualización*/
    useEffect(() => {
        if ( !user ) return;
        
        /*grabamos el user y le ponemos nombre de key: user, pero solo podemos grabar strings y ahí el init ahora si podrá 
        leer el user del local storage cada que se recarga la app*/
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);


    return (
        /*AuthContext es un Higher Order Component, necesitamos que provea información a componentes hijos, 
        para eso el value, que es una expresión y le mandas la info o funciones que vuelvan a renderizar componentes,
        ej: useReducer
        
        Podemos ver los valores de user en el Context.Provider de la pestaña "Components" de react devTools
        */
        <AuthContext.Provider value= {{
            user,
            dispatch
        }}>

            <AppRouter />
        </AuthContext.Provider>
    )
}