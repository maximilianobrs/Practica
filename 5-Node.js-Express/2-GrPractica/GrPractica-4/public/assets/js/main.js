const formulario = document.querySelector('#formulario');
const error = document.querySelector(".error");

const errorView = (mensaje)=>{
    error.innerHTML= mensaje;
    error.style.display ='flex';
}
const errorRemove = ()=>{
    error.innerHTML="";
    error.style.display ='none';
}

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
              window.location.href = '/galeria'; // Redirigir al endpoint /galeria
            } else {
              
            }
          } catch (error) {
            
          }
    }
});