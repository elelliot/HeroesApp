import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string'
import { useMemo } from "react";

import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {

    //(Paso 1a search) Queremos buscar un heroe con el form...:
    const navigate = useNavigate();

    //(paso 2a search) para leer la location
    const location = useLocation();

    //(paso 2a search (optional) ) Visualizamos el query...pero... 
    // console.log(location.search);
    
    //(paso 2b) Hay que separar la query en caso de tener más de un param. por ejemplo: q=superman&pulisher=dc
    /* como esto te devuelve formato de objeto, desestructuramos, y como lo nombramos "q" en el navigate,
    así le ponemos y le damos un valor por defecto */
    const { q = '' } = queryString.parse(location.search);

    
    //paso 2b ahora ese initialvalue ya no será un string vacío tal cual, ahora es "q" , gracias a esto al escribir y recargar, el valor se conserva en el form
    const [ formValues , handleInputChange ] = useForm({
        searchText: q
    });


    const { searchText } = formValues;

    /*Paso 3a, hacer que la busqueda funcione, el q es lo que escribimos así que lo usamos aquí y como
    la función se dispara cada que cambia el estado (al teclear en el form) hay que memorizarla*/
    const heroesFiltered =useMemo( () => getHeroesByName( q ) ,[ q ]);


    /*La estructura de la función del onSubmit { (e) => handleSearch(e) }, pero se puede simplificar dejandolo: 
    { handleSearch } si solo (creo...) se envía el evento como arg, y aquí lo recibimos sin problema */
    const handleSearch = (e) => {
        e.preventDefault();
        // console.log( searchText );

        //(Paso 1b search) ...de esta forma le damos los parametros...¿como los leo?...
        navigate(`?q=${ searchText }`)
    }


    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="Buscar un heroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value = { searchText }
                            onChange = { handleInputChange }
                        />
                        
                        <button 
                            className="btn btn-outline-primary mt-1 "
                            type="submit">
                            Buscar...
                        </button>


                    </form>
                </div>

                <div className= "col-7">
                    <h4>Resultados</h4>
                    <hr />
                    
                    {/* if (q=== '') { tira el texto: Buscar un héroe } else if (heroesFiltered.length === 0) {No results}*/
                        (q === '')
                            ? <div className="alert alert-info">Buscar un héroe</div>
                            : ( heroesFiltered.length === 0)
                                && <div className="alert alert-danger">No hay resultados para: { q } </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard
                                key = { hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}