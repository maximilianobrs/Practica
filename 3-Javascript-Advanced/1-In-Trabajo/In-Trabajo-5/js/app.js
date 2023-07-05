//DEFIENDO LAS VARIABLES DEL DOM 
const categorias = document.querySelector("#categorias");
const sectCards = document.querySelector("#sectCards")


// DANDOLE UNA VALIABLE EL VALOR DE LA URL
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

//FUNCION CAPTURANDO LA API DEL URL CON PROMESAS 
const imprimirDatdos = async (valor) => {
    try {

        let response = await fetch(`${url}`)
        let data = await response.json()


        sectCards.innerHTML = ''

        //RECOENDO LA DATA CON UN FOREACH
        data.categories.forEach(element => {
            //VALIDANDO LA ID QUE EL NOMBRE QUE SE SELECCIONA EN EL SELECT Y DANDO UNA VALIDACION TRUE PARA IMPRIMIR TODO
            if (element.idCategory == valor || valor == "resest") {
                sectCards.innerHTML +=
                    `
            <div class=" col-5 m-2">
                <div class="card" style="width: auto; height: 100%;">
                    <img src="${element.strCategoryThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strCategory}</h5>
                        <p class="card-text">${element.strCategoryDescription}</p>
                    </div>
                </div>
            </div>            
            `
            console.log(element)
            }
        });

    } catch (error) {
        console.log(error)
    }
}

//CAPTURANDO CON UN EVENTO EL VALOR ID DEL SELECT DEL DOM
categorias.addEventListener('change', async (e) => {
    const selec = await e.target.value;
    imprimirDatdos(selec)
    console.log(selec)
})
//DANDO UN STRING RESETS AL CICLO FOREACH 
document.addEventListener("DOMContentLoaded", async () => {
    await imprimirDatdos("resest");
});