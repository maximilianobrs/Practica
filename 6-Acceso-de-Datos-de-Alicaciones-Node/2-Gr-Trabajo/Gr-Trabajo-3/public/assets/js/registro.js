
const formRegistro = document.querySelector('#formRegistro');
const nombre = document.querySelector('#nombre');
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

//Funcion validaciones nombre
export const validacionesNombre = (nombre,element)=>{
    if(nombre.length === 0 ){
        agregarError(element,"Ingreso de datos requerido")
    }else if(nombre.length < 4){
        agregarError(element,"El nombre debe tener almenos 4 caracteres")
    }else{
        removerError(element);
        return true
    }
}

//Funcion validaciones email
export const validacionesEmail = (email,element)=>{
    if(email.length === 0 ){
        agregarError(element,"Ingreso de datos requerido")
    }else if(!validEmail(email)){
        agregarError(element,"Email no es valido")
    }else{
        removerError(element);
        return true
    }
}

//Funcion validaciones contraseña
export const validacionesContrasenia = (contrasenia,element)=>{
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
    const valueNombre = nombre.value;
    const valueEmail = email.value;
    const valueContrasenia = contrasenia.value;

    const responseNombre = await validacionesNombre(valueNombre,nombre);
    const responseEmail = await validacionesEmail(valueEmail,email);
    const responseContrasenia = await validacionesContrasenia(valueContrasenia,contrasenia);

    if(responseNombre && responseEmail && responseContrasenia){
         axios.post("http://localhost:7000/registro",{
            nombre:valueNombre,
            email:valueEmail,
            contrasenia:valueContrasenia
         }).then((response)=>{  
            if(response.data.result){
                window.location.replace("http://localhost:7000/login");
            }
         })
    }
}
//Capturando el evento submit del formulario
formRegistro.addEventListener('submit',(e)=>{
        e.preventDefault();
        valueform();
});