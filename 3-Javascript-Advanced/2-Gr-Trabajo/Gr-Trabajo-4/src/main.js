import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import lugares from './assets/js/lugares.js';

document.addEventListener('DOMContentLoaded', async () => {
  lugares.forEach(async (lugar) => {
    renderCols(lugar.id);
    let data = await consultarAPI(lugar.lat, lugar.lon)
    await render(data, lugar)
  })
  try {
    let promesa = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Información Enviada')
      }, 2000)
    }
    )
    crearModal({ id: 'modal1', title: 'Mensaje', body: promesa })
  } catch (error) { console.log(error) }

});

const render = (data, lugar) => {

  const { name, main, weather } = data;
  const { temp, temp_max, temp_min } = main;
  const { description, icon } = weather[0];
  const div = document.createElement('div');
  div.classList.add('card', 'text-center', 'mx-auto', 'mt-5');
  div.innerHTML = `
  <div class="card-header">
    <h1>${name}</h1>
  </div>
  <div class="card-body">
    <h5 class="card-title">${description}</h5>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="icono">
    <p class="card-text">Temperatura: ${kelvinToCelsius(temp)}°C</p>
    <p class="card-text">Máxima: ${kelvinToCelsius(temp_max)}°C</p>
    <p class="card-text">Mínima: ${kelvinToCelsius(temp_min)}°C</p>
  </div>
  <div class="card-footer text-muted">
    <p>Zona: ${lugar.zona.toUpperCase()}</p>
  </div>
  `;
  document.querySelector('#' + lugar.id).appendChild(div);
}

const renderCols = (id) => {
  let cardsWeather = document.querySelector('#cards-weather');
  let div = document.createElement('div');
  div.classList.add('col-md-4', 'mt-5');
  div.setAttribute('id', id);
  cardsWeather.appendChild(div);
}

const consultarAPI = async (lat, lon) => {
  try {
    const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=50fa816584065491bf8685665a2b7e54&lang=es`,
      { method: 'post' });
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.log(error);
  }

}

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
}
 
const crearModal = ({ id, title, body }) => {
  let modal = `
  <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        ${body}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>`
  document.querySelector('#modal').innerHTML = modal;
  var myModal = new bootstrap.Modal(document.getElementById(id), {
    keyboard: false
  })
  myModal.toggle();
}
