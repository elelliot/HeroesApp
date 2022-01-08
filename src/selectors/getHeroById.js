import { heroes } from "../data/heroes"

export const getHeroById = ( id ='' ) => {
    // comprobando useMemo 
    console.log('getHeroById called');
    return heroes.find( hero => hero.id === id );
}