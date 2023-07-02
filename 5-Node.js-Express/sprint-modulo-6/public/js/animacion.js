let mainForm = document.querySelector('.mainForm');
let historial = document.querySelector('.historial');
let roommates = document.querySelector('.roommates');

// Mostrar roommates al principio
roommates.style.display = "block";

// Manejo de animacion de los box.
document.getElementById("bt1").addEventListener('click', (e) => {
    e.preventDefault();

    if (historial.style.display === "block") {
        mainForm.style.animationName = "aparicion";
        historial.style.animationName = "desaparecer";
        mainForm.style.display = "block";
        historial.classList.add("ocultar");
        setTimeout(function () {
            historial.style.display = "none";
        }, 500);
    } else if (roommates.style.display === "block") {
        mainForm.style.animationName = "aparicion";
        roommates.style.animationName = "desaparecer";
        mainForm.style.display = "block";
        roommates.classList.add("ocultar");
        setTimeout(function () {
            roommates.style.display = "none";
        }, 500);
    }else if(mainForm.style.display === "none" && historial.style.display === "none" && roommates.style.display === "none"){
        setTimeout(() => {
            mainForm.style.animationName = "aparicion";
            mainForm.style.display = "block";
        }, 1000);
    }
});

document.getElementById("bt2").addEventListener('click', (e) => {
    e.preventDefault();

    if (mainForm.style.display === "block") {
        historial.style.animationName = "aparicion";
        mainForm.style.animationName = "desaparecer";
        historial.style.display = "block";
        mainForm.classList.add("ocultar");
        setTimeout(function () {
            mainForm.style.display = "none";
        }, 500);
    } else if (roommates.style.display === "block") {
        historial.style.animationName = "aparicion";
        roommates.style.animationName = "desaparecer";
        historial.style.display = "block";
        roommates.classList.add("ocultar");
        setTimeout(function () {
            roommates.style.display = "none";
        }, 500);
    }else if(mainForm.style.display === "none" && historial.style.display === "none" && roommates.style.display === "none"){
        setTimeout(() => {
            historial.style.animationName = "aparicion";
            historial.style.display = "block";
        }, 1000);
    }
});

document.getElementById("bt3").addEventListener('click', (e) => {
    e.preventDefault();

    if (mainForm.style.display === "block") {
        roommates.style.animationName = "aparicion";
        mainForm.style.animationName = "desaparecer";
        roommates.style.display = "block";
        mainForm.classList.add("ocultar");
        setTimeout(function () {
            mainForm.style.display = "none";
        }, 500);
    } else if (historial.style.display === "block") {
        roommates.style.animationName = "aparicion";
        historial.style.animationName = "desaparecer";
        roommates.style.display = "block";
        historial.classList.add("ocultar");
        setTimeout(function () {
            historial.style.display = "none";
        }, 500);
    }else if(mainForm.style.display === "none" && historial.style.display === "none" && roommates.style.display === "none"){
        setTimeout(() => {
            roommates.style.animationName = "aparicion";
            roommates.style.display = "block";
        }, 1000);
    }
});