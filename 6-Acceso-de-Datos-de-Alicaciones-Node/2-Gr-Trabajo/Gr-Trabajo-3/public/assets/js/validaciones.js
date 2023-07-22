const formRegistro = document.querySelector('#formRegistro');
const formLogin = document.querySelector('#formLogin');
const loginEmail = document.querySelector('#loginEmail');
const loginContrasenia = document.querySelector('#loginContrasenia');
const RegistroEmail = document.querySelector('#RegistroEmail');
const RegistroContrasenia = document.querySelector('#RegistroContrasenia');
const tabla = document.querySelector('#tabla');

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
const validacionesEmail = (email,element)=>{
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
const validacionesContrasenia = (contrasenia,element)=>{
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


const obtenerUsuarios = async()=>{
    try {
        let response = await axios.get("http://localhost:7000/usuarios")
        let usuarios = response.data

        const tablaBody = usuarios.map(usuario => `
        <tr>
          <td>${usuario.email}</td>
          <td>${usuario.password}</td>
        </tr>
      `).join('');

        tabla.innerHTML = tablaBody;
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('load',obtenerUsuarios);

//Funcion inicio de validaciones formulario
const valueFormRegistro = async()=>{
    const valueEmail = RegistroEmail.value;
    const valueContrasenia = RegistroContrasenia.value;

    const responseEmail = await validacionesEmail(valueEmail,RegistroEmail);
    const responseContrasenia = await validacionesContrasenia(valueContrasenia,RegistroContrasenia);

    if(responseEmail && responseContrasenia){
         axios.post("http://localhost:7000/usuario",{
            email:valueEmail,
            contrasenia:valueContrasenia
         }).then((response)=>{   
            if(response.status === 201){
                obtenerUsuarios();
            }
         }).catch((error)=>{
            console.log(error);
         })
    }
}
const valueFormLogin = async()=>{
    const valueEmail = loginEmail.value;
    const valueContrasenia = loginContrasenia.value;

    const responseEmail = await validacionesEmail(valueEmail,loginEmail);
    const responseContrasenia = await validacionesContrasenia(valueContrasenia,loginContrasenia);

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

//Capturando el evento submit de los formularios
formRegistro.addEventListener('submit',(e)=>{
        e.preventDefault();
        valueFormRegistro();
});

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    valueFormLogin();
});
