//exportando la funcion asincrona miRandomPoke.
export const miRandomPoke = async ()=>{
    try {
        //obteniendo un numero random entre 1 y 151.
        const randomNum = Math.floor(Math.random() * 151) + 1

        //solicitaud a la API.
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)

        //Obteniendo la respuesta en formato JSON.
        const data = await respuesta.json();
        
        //Extrayendo el nombre y id en un Objeto.
        const pokemon = {
            nombre: data.name,
            ID: data.id
        }
        //Retornado el Objeto pokemon
        return pokemon;
    } catch (error) {
        console.log(error)
    }
}