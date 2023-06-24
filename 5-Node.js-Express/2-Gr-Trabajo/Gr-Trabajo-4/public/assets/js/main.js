const formulario = document.querySelector('#formulario');
const error = document.querySelector(".error");

// Función para mostrar un mensaje de error
const errorView = (mensaje)=>{
    error.innerHTML= mensaje;
    error.style.display ='flex';
}
// Función para remover el mensaje de error
const errorRemove = ()=>{
    error.innerHTML="";
    error.style.display ='none';
}
//Agregando el evento al formulario condo se envia un submit.
formulario.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const url = document.querySelector("#url").value;

    if (url.trim() === '') {
        const mensaje = "Ingresar un URL valido"
        // Mostrar un mensaje de error o realizar otras acciones necesarias
        errorView(mensaje);
        return;
    }else{
        errorRemove();
        try {
            const response = await axios.post('http://localhost:3000/upload', {
              url
            });
            if (response.status === 200) {
              window.location.href = '/galeria'; // Redirigir al endpoint /galeria si la respuesta es true.
            } else {
              console.log("la respuesta al servidor no fue exitosa");
            }
          } catch (error) {
            console.log(error);
          }
    }
});