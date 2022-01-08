import { mount } from "enzyme";
import { MemoryRouter,Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../components/types/types";

//Como se usa el useNavigate, debo poner esto y luego lo probaremos
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Pruebas en <LoginScreen />', () => {
    

    //Creamos contexto para mandarlo
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged: false
        }
    }


    //Mount global
    const wrapper = mount( 
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />                                
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>    
    );


    test('Debe hacer match con Snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });



    test('Debe realizar el dispatch y la navegación', () => {
        //Login con el click...
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        //-Que el dispatch se ejecute con la acción, {name: Elliot}
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: { name:"Elliot Miranda" }
        });


        //que el mockNavigate sea llamado con (/marvel (si no hay una por default, será esa), {replace:true})
        expect( mockNavigate ).toHaveBeenCalledWith( '/marvel', { replace: true } )


        //"Simulamos" la visita de una nueva pagina (Ya no ocupamos hacer mock)
        localStorage.setItem('lastPath', '/dc');

        //Volvemos a usar el Click del login...
        handleClick();
        //... y al volver a loguearnos este debería ser el valor con el que se llamó mockNavigate
        expect( mockNavigate ).toHaveBeenCalledWith( '/dc', { replace: true } )
    })
    
    
})
