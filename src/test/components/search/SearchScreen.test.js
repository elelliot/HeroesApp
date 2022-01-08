import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

/*Preparar para poder probar el navigate, se debe hacer un mock del useNavigate:
    1-sin el requireActual todas las pruebas fallan

    2-con el requireActual, es como si no hiciera nada, 
    volvemos a tomar todo el paquete y 
    con esto podemos acceder a las funciones del paquete y sobreescribir el 
    useNavigate, es una función (Hook) que al llamarse regresa otra funcion (navigate (hay muchas, pero es la que usamos))
    y esa es la que llamo para hacer la navegación en el <SearchScreen>

    3-si le ponemos jest.fn() en el useNavigate en teoría está bien, pero ahora debo probar el useNavigate,
    no puedo, por que lo estoy creando en ese momento;

    por tanto afuera debo crear un mockNavigate (debe tener "mock" al inicio del nombre de la variable 
    por que es palabra clave, si no, no sirve)

    4-Después de que el mockNavigate haya hecho el llamado del posteo del form, se pueden hacer aserciones.
*/
//3
const mockNavigate = jest.fn();

//1 y 2
//Esto me sirve para hacer mock de cualquier hook de cualquier librería
//Básicamente hacemos mock de react-router-dom y retornamos todo igual, exceptuando que sobreescribimos el useNavigate (Recordar que es una función que regresa otra función)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))





describe('Pruebas en <SearchScreen />', () => {
    

    test('Debe de mostrarse con valores por defecto', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen /> 
            </MemoryRouter>
        );
        
        expect( wrapper ).toMatchSnapshot();
        
        expect( wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');


    })

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchScreen /> 
            </MemoryRouter>
        );

        //buscamos la propiedad value del input 
        expect( wrapper.find('input').prop('value')).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    })
    
    
    test('Debe de mostrar un error si no se encuentra el hero', () => {
        

        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <SearchScreen /> 
            </MemoryRouter>
        );

        //No hay resultados: batman123
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No hay resultados para: batman123');

    })









    test('Debe de llamar el navigate a la nueva pantalla', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen /> 
            </MemoryRouter>
        );


        //Escribimos en el input, aún no enviamos
        //evento, argumentos
        wrapper.find('input').simulate('change',{
            target:{
                name: 'searchText',
                value:'batman'
            }
        });

        //Disparamos el submit del formulario
        /*wrapper.find('form').prop('onSubmit') apunta a una función, 
        recordar que el evento se manda y se usa el preventDefault, ese el que debemos mandarle
        */
        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });


        //4, ahora podemos probar depués de preparar todo
        //Que el mockNavigate (useNavigate) haya sido llamado...
        expect( mockNavigate ).toHaveBeenCalled();
        //...y que se llame con... (?q=batman) (args de url (?q=) + target.value (batman en este caso))
        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');


    })
    
    
})
