import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"

import { AuthContext } from "../../auth/authContext"
import { PrivateRoute } from "../../routers/PrivateRoute"



//Para la prueba 2, queremos hacerle mock al <Navigate>, y un componente es una función que regresa JSX básicamente,
//así que lo sobreescribimos de esa manera
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aquí</span>
}));

describe('Pruebas en <PrivateRoute />', () => {
    
    //Así hacemos mock del LocalStorage, para saber si fue llamado o con que args se llamó, etc.
    Storage.prototype.setItem = jest.fn();


    test('Debe de mostrar el componente si está autenticado y guardar en el localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name:'Elliot'
            }
        };

        //El Private route recibe un children, que puede ser cualquier cosa
        //Memory Router lo ponemos por que usamos el useLocation

        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );


        // console.log(wrapper.html());
        
        //Si estamos autenticados se muestra el children: <h1>Private Component</h1>
        expect( wrapper.text().trim() ).toBe('Private Component');

        //Que se llame el localStorage.setItem, con el path en el que estamos, la del initialEntries
        //también podemos hacerlo con el Storage.prototype.setItem, no hay diferencia
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/');
    })


    test('Debe bloquear el componente si no está autenticado', () => {
        

        const contextValue = {
            user: {
                logged: false
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        console.log(wrapper.html());

        //Si el <Navigate> mockeado se usa correctamente, pone 'Saliendo de aquí' (ver el mock del inicio))
        expect( wrapper.text().trim() ).toBe('Saliendo de aquí');

    })
    
    
})
