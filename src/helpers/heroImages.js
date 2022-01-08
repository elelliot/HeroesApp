//el 2do argumento es para que busque en subdirectorios Forma 3 de trabajar imagenes (Ver el HeroScreen)
export const heroImages = require.context('../assets/heroes', true);//esto es de WebPack
//Estas imagenes no se agarran cuando las despliego con el build en github pages, why? idk
//Comentario de la clase 196 dice una solución pero no agarra, será problema de react-router-dom v6 perhaps?, el lo tiene en la v5

