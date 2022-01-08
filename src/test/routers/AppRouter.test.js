import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";



describe('Pruebas en <AppRouter />', () => {
    
    
    test('Debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }

        /*
        -Como AppRouter necesita el valor del contexto (ver el HeroesApp) se lo debemos pasar (lo creamos aquí)
        -Usamos mount para renderizar todo ya que con el shallow solo renderizamos el primer componente (BrowserRouter) 
        */
       const wrapper = mount(
            <AuthContext.Provider value = { contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' )        

    });


    test('Debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            user: {
                name:'Elliot',
                logged: true
            }
        }
        
        /*
        -Como AppRouter necesita el valor del contexto (ver el HeroesApp) se lo debemos pasar (lo creamos aquí)
        -Usamos mount para renderizar todo ya que con el shallow solo renderizamos el primer componente (BrowserRouter) 
        */
       const wrapper = mount(
            <AuthContext.Provider value = { contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBeTruthy(); 
              

    });
    
    
})
