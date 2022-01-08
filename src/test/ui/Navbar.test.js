import { MemoryRouter, Routes, Route } from "react-router-dom";
import { mount } from "enzyme";

import { AuthContext } from "../../auth/authContext";
import { Navbar } from "../../components/ui/Navbar";
import { types } from "../../components/types/types";



//Se debe hacer mock por que se usa el useNav en el comp, ademas lo probaremos en el 2do test
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <Navbar />', () => {
    
  
    //Creamos contexto para mandarlo
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged: true,
            name:'Elliot'
        }
    }

    //Mount global
    const wrapper = mount( 
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/*'] }>
                <Routes>
                    <Route path="/*" element={ <Navbar /> } />                                
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>    
    );

    test('Debe mostrar correctamente', () => {
        
        //Snapshot
        expect( wrapper ).toMatchSnapshot();
        
        // Que "Bienvenido: Elliot" sea lo que se muestre en la navbar
        expect( wrapper.find('.text-info').text().trim()).toBe('Bienvenido: Elliot');

    });






    

    
    test('Debe de llamar el logout, llamar el Navigate con los args y el dispatch con los args', () => {

        //Para llamar el Logout, solo dispara la función y no recibe arg, así que lo dejo así
        wrapper.find('button').simulate('click');
        
        //El dispatch ocupa la acción
        const action = {
            type: types.logout
        }
        //Debe llamar el dispatch con args
        expect( contextValue.dispatch ).toHaveBeenCalledWith(action);

        //Debe llamarse el navigate con args al dar click en el botón
        expect( mockNavigate ).toHaveBeenCalledWith( '/login', {replace: true} );
    })

    
    
})
