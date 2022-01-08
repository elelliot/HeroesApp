import { authReducer } from "../../auth/authReducer";
import { types } from "../../components/types/types";



describe('Pruebas en authReducer', () => {
    
    test('Debe retornar el estado por defecto', () => {
        

        //estado inicial sería el logged y la acción el objeto vacío
        const state = authReducer({ logged: false}, {});

        //si quiero evaluar objetos, debe ser con toEqual 
        //toBe solo evalúa con primitivos, (String con String o bool con bool)
        expect( state ).toEqual({logged: false});
    });


    test('(Login) Debe autenticar y colocar el "name" del usuario', () => {
        
        //Queremos que la acción te logee correctamente y ponga tu nombre
        const action = {
            type: types.login,
            payload: {
                name: 'Elliot'
            }
        }

        //state inicial y acción que cambiará el state
        const state = authReducer({ logged: false}, action);

        //el nuevo estado debe ser logged true y el nombre que pones en la acción
        expect( state ).toEqual({
            logged:true,
            name: 'Elliot'
        })
    });


    test('(Logout) Debe borrar el nombre del usuario y logged en false', () => {
        
        //Queremos la acción ponga en logout el estado
        const action = {
            type: types.logout
        };

        //Estado con el login y la acción para cambiarlo
        const state = authReducer({ logged: true, name: 'Elliot'}, action);
        // console.log(state)
        
        //Esperamos que el estado ahora sea {logged: false}
        expect( state ).toEqual({ logged:false });
    })
    
    
    
})
