import { types } from "../components/types/types";

// const state = {
    //     name: 'Elliot',
    //     logged: true
    // }
    
    
    
//Autenticamos el login
//El action modifica el state, y cuando eso pase, react dispara los cambios y redibuja
export const authReducer = (state = {}, action ) => {
    
    // console.log(action)
    switch( action.type ) {
        case types.login:
            return {
                ...action.payload, //así me evito poner 1 por uno ej: action.payload.name (ver el types.js)
                logged: true,
            }

        case types.logout:
            return {
                logged: false //sin payload
            }

            default:
                return state; //regresamos el state vacío
    }
}