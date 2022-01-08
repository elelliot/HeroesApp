import { HeroCard } from "./HeroCard";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import { useMemo } from "react";

export const HeroList = ( { publisher } ) => {
    
    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );
    
    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeInUp">
            {
                heroes.map( hero => (      
                    <HeroCard 
                        key= { hero.id  /*si no pongo el key, me tira warning*/ }
                        { ...hero } //Desestructuramos las propiedades en vez de ponerlas una por una
                    />
                ))
            }
        </div>
    )
}
