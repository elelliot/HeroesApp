import { heroes } from "../data/heroes";

export const getHeroesByName = ( name= '' ) => {

    // console.log('getHeroesByName Called');
    //Si no escribimos nada, no hay resultados, o puedo quitar esto para que se vean todos, personal taste.
    if(name.length === 0) {
        return [];
    }

    name = name.toLowerCase();
    return heroes.filter( hero => hero.superhero.toLowerCase().includes(name));

}