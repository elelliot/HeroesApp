import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";



describe('Pruebas en <DashboardRoutes />', () => {
    //Necesitamos darle contexto por que no va agarrar el nombre del user en el <Navbar /> y dará error
    const contextValue = {
        user:{
            logged: true,
            name:'Elliot'
        }
    }
    test('Debe de mostrarse correctamente Marvel', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/* 
                -Como DashBoardRoutes abarca el Navbar, no se renderiza sin loguearse, hay que proveer el user del contexto
                -El useNavigate solo puede ser usado en el contexto de un <Router> y para eso es el MemoryRouter
                -initialEntries es el argumento en que definimos el path inicial para probar rutas */}
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();

        //-Debe decir lo del contextValue pero como yo le puse "Bienvenido: " en el componente, se lo debo agregar
        //Más que nada para probar el nombre del <Navbar>
        expect(wrapper.find('.text-info').text().trim()).toBe('Bienvenido: Elliot' );

        expect( wrapper.find('h1').text().trim()).toBe('MarvelScreen');

    });

    test('Debe de mostrarse correctamente DC', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/* 
                -El useNavigate solo puede ser usado en el contexto de un <Router>, pero con el Memory Router
                y para eso es el MemoryRouter
                -initialEntries es el argumento en que definimos el path inicial para probar rutas */}
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        
        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim()).toBe('DCScreen');

    });
    
})
