import { heroes } from "../data/heroes";


export const getHeroesByPublisher = ( publisher ) => {

    const validPublisher = ['DC Comics', 'Marvel Comics'];
    if( !validPublisher.includes( publisher ) ){
        throw new Error( `${ publisher } is not a valid publisher` );
    }
    //comprobando useMemo (hay que usar el counter en el mas... para ver si así)
    // console.log('getHeroByPublisher called');

    return heroes.filter( hero => hero.publisher === publisher );
};