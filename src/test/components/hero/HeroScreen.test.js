import { MemoryRouter,Routes, Route } from "react-router-dom";
import { mount } from "enzyme";
import { HeroScreen } from "../../../components/hero/HeroScreen";



const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Pruebas en el <HeroScreen />', () => {
    

    test('No debe de mostrar el HeroScreen si no hay un heroe en el url', () => {
        

        //Lanzamos el componente sin heroe, así que nos lleva al "/"
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );



        console.log(wrapper.html());

        expect( wrapper.find('h1').text().trim()).toBe('No hero page')
    });



    test('Debe de mostrar el heroe si el parámetro existe y se encuentra', () => {
        

        //Lanzamos el componente con argumento, entonces que nos lleve al HeroScreen y que muestre el Heroe
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );



        console.log(wrapper.html());

        expect( wrapper.find('.row').exists() ).toBe(true);
    })
    
    


    test('Debe de regresar la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });



    test('Debe de mostrar el No hero page si mandamos un heroe que no existe', () => {
        

        //Lanzamos el componente con argumento 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider75225']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );



        console.log(wrapper.html());

        expect( wrapper.text() ).toBe('No hero page');
    })
})
