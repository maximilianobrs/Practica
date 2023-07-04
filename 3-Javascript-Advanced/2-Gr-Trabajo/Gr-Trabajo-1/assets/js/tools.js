//Función para agregar una empresa en el LocalStorage
const agregarEmpresaLocalStorage = (empresa) => {
  let empresas;
  empresas = obtenerLocalStorage('empresas');
  empresas.push(empresa);
  localStorage.setItem('empresas', JSON.stringify(empresas));
}

//Editar un registro de localstorage de empresas
const editarEmpresaLocalStorage = (empresa) => {

  let empresas;
  empresas = obtenerLocalStorage('empresas');
  empresas.forEach((empresaLS, index) => {
    if (empresaLS._id === empresa.id) {
      empresas.splice(index, 1, empresa);
    }
  });
  localStorage.setItem('empresas', JSON.stringify(empresas));
}

//Función para obtener las empresas del LocalStorage
const obtenerLocalStorage = (value) => {
  let values;
  if (localStorage.getItem(value) === null) {
    values = [];
  } else {
    values = JSON.parse(localStorage.getItem(value));
  }
  return values;
}

const renderTable = (empresas) => {
  const listaEmpresas = document.getElementById('listaEmpresas');
  listaEmpresas.innerHTML = ''
  empresas.forEach((empresa) => {
    const { _id, _nombre, _rut } = empresa;
    const oEmpresa = new Empresa(_id, _nombre, _rut);

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${oEmpresa.id}</td>
    <td>${oEmpresa.nombre}</td>
    <td>${oEmpresa.rut}</td>
    <td>
      <button class="btn btn-success" onclick="modalAgregarImportaciones(${oEmpresa.id})">Agregar Importaciones</button>
      <button class="btn btn-warning" onclick="getTotalImportaciones(${oEmpresa.id})">Obtener Total Importaciones</button>
      <button class="btn btn-warning" onclick="getTotalPorProducto(${oEmpresa.id})">Obtener Total por Producto</button>
    </td>
    `;
    listaEmpresas.appendChild(row);


  }
  );
}

const renderSelect = (empresas) => {
  const selectIdEmpresa = document.getElementById('id_empresa');
  selectIdEmpresa.innerHTML = '<option value="">Seleccione una empresa</option>'

  empresas.forEach((empresa) => {
    const { _id, _nombre, _rut } = empresa;
    const oEmpresa = new Empresa(_id, _nombre, _rut);
    const row = document.createElement('option');
    row.value = oEmpresa.id;
    row.innerHTML = oEmpresa.nombre;
    selectIdEmpresa.appendChild(row);
  }
  );
}
const modalAgregarImportaciones = (idEmpresa) => {

  const myModal = new bootstrap.Modal('#modalImportaciones', {
    keyboard: false
  })
  const id_empresa = document.getElementById('id_empresa');
  id_empresa.value = idEmpresa
  id_empresa.disabled = true

  myModal.show()

}

const getTotalImportaciones = (idEmpresa) => {
  let empresas = obtenerLocalStorage('empresas');
  const empresa = empresas.find((empresa) => empresa._id == idEmpresa);
  const oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut);
  oEmpresa.importaciones = empresa._importaciones;
  const total = oEmpresa.getTotalImportaciones()
  const totalMonto = oEmpresa.getTotalImportacionesMonto()
  showMessage(`<p>El total de importaciones de la empresa ${oEmpresa.nombre} es: </p>
  <strong>${total} ${total>1?'importaciones':'importación'}</strong> de un total monetario de 
  <strong>${totalMonto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong>
  `)
}

const getTotalPorProducto = (idEmpresa) => {
  let empresas = obtenerLocalStorage('empresas');
  const empresa = empresas.find((empresa) => empresa._id == idEmpresa);
  const oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut);
  oEmpresa.importaciones = empresa._importaciones;
  const produtos = oEmpresa.getTotalPorProducto()
  let table = '<table class="table"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th></tr></thead><tbody>'
  produtos.forEach((producto) => {
    const { nombre, total,cantidad,precio_unitario } = producto;
    console.log(producto)
    table += `
    <tr>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio_unitario.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
    <td>${total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
    </tr>
    `;
  }
  );
  table += '</tbody></table>'
  showMessage(`El total de importaciones por producto de la empresa ${oEmpresa.nombre} es: ${table}`)
}

const showMessage = (message) => {
  const myModal = new bootstrap.Modal('#modalMessage', {
    keyboard: false
  })
  const messageModal = document.getElementById('messageModal');
  messageModal.innerHTML = message
  myModal.show()
}

var Fn = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
      return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (Fn.dv(rut) == digv);
  },
  dv: function (T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }
}