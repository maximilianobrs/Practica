const formRegistro = document.querySelector('#formRegistro');
const email = document.querySelector('#email');
const contrasenia = document.querySelector('#contrasenia');

//Funcion para agregar el mensaje de error
const agregarError = (element,mensage)=>{
    const results = element.parentElement.querySelector('.results')
    results.innerHTML = mensage;
    results.classList.add('error')
}

//Funcion para quitar el mensaje de error
const removerError = (element)=>{
    const results = element.parentElement.querySelector('.results')
    results.innerHTML = "";
    results.classList.remove('error')
}

//Funcion para validar el email regex
const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Funcion validaciones email
const valuesEmail = (email,element)=>{
    if(email.length === 0 ){
        agregarError(element,"Ingreso de datos requerido")
    }else if(!validEmail(email)){
        agregarError(element,"Email no es válido")
    }else{
        removerError(element);
        return true
    }
}

//Funcion validaciones contraseña
const valuesContrasenia = (contrasenia,element)=>{
    if(contrasenia.length === 0 ){
        agregarError(element,"Ingreso de datos requerido")
    }else if(contrasenia.length < 8){
        agregarError(element,"La contraseña debe tener al menos 8 caracteres")
    }
    
    else{
        removerError(element);
        return true
    }
}

//Funcion inicio de validaciones formulario
const valueform = async()=>{
    const valueEmail = email.value;
    const valueContrasenia = contrasenia.value;

    const responseEmail = await valuesEmail(valueEmail,email);
    const responseContrasenia = await valuesContrasenia(valueContrasenia,contrasenia);

    if(responseEmail && responseContrasenia){
         axios.post("http://localhost:7000/login",{
            email:valueEmail,
            contrasenia:valueContrasenia
         }).then((response)=>{ 
            console.log(response.status);
            if(response.status === 200){
                console.log('if');
                window.location.replace("http://localhost:7000/lobby");
            }else {
                agregarError(contrasenia,"No se pudo establecer conexión");
            }
         }).catch((error)=>{
            console.log(error);
         })
    }
}

//Capturando el evento submit del formulario
formRegistro.addEventListener('submit',async(e)=>{
        e.preventDefault();
        valueform();
});