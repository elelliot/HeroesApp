import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";

//"batman" apunta a una imagen
// import batman from '../../assets/heroes/dc-batman.jpg' //estático Forma 2 de trabajar imagenes

//el 2do argumento es para que busque en subdirectorios Forma 3 de traajar imagenes
// const heroImages = require.context('../../assets/heroes', true);//esto es de WebPack



export const HeroScreen = () => {

    //razón de useMemo
    // const [counter, setCounter] = useState(0);




    //en router-dom v5 se usaban props
    //con useParams(hook) obtenemos el argumento por el url (del dashboard routes, esto es de react-router-dom v6), me da un objeto que podemos desestructurar
    const { heroeId } = useParams();

    /*
    Como la función se ejecuta cada vez que le damos click al botón "regresar" en la pantalla del heroe, 
    (los comentarios con titulo "razón de useMemo", son los que descomentaremos para hacer la prueba) y no queremos eso,
    podemos usar el useMemo para memorizar el valor y solo cuando cambie volverlo a memorizar 
    
    useMemo (es una función que debe regresar el valor que se quiere memorizar),
    el 2do arg es la dependencia que hará que el useMemo se vuelva a disparara cada que cambie, si el heroeId cambia 
    se debe memorizar el nuevo valor y se llama de nuevo la función getHeroById*/
   const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]); 
   
   


    //useNavigate no necesariamente recibe un string de parametro.
    const navigate = useNavigate();
    //...es -1 en el historial, por lo que regresarías a la página anterior
    const handleReturn= () => {
        navigate(-1);
        
        //razón de useMemo
        // setCounter( counter + 1 );
    };




    //Queremos que nos redireccione a una página cuando un heroe no existe:

    //Hacer esto estaría mal por qué le estamos diciendo que es un functional component que NO regresa un component(retorna null) y eso no se puede
    // const navigate = useNavigate();
    // if(!hero) {
    //     navigate('/marvel');
    //     return null   
    // }
    
    //La forma correcta sería usando el componente Navigate:
    if(!hero) {
        return <Navigate to='/' />
    }



    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    ///Forma 1 de trabajar imagenes  public/assets/heroes
    // const imagePath= `/assets/${ heroeId }.jpg`;

    return (
        <div className="row mt-5 ">
            <div className="col-4">
                <img 
                    // src={ imagePath } // desde public/assets/heroes //Forma 1
                    // src={ batman } // import Forma 2
                    src = { heroImages(`./${ heroeId }.jpg`).default } //forma 3 por weas de webpack debo usar el .default

                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"

                />
            </div>

            <div className="col-8 animate__animated animate__fadeInRight">
                <h3>{ superhero }</h3>
                <ul className="list-group">
                    <li className="list-group-item"><b>Alter ego:</b> { alter_ego }</li>
                    <li className="list-group-item"><b>Publisher:</b> { publisher }</li>
                    <li className="list-group-item"><b>First appearance:</b> { first_appearance }</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{ characters }</p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Regresar{/* Razón de useMemo{ counter } */}
                </button>

            </div>

        </div>
    )
}
