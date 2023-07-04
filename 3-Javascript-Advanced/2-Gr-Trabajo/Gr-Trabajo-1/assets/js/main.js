document.addEventListener('DOMContentLoaded', function () {

  const empresas = obtenerLocalStorage('empresas');
  renderTable(empresas);
  renderSelect(empresas);

  const formAddBussines = document.getElementById('formAddBussines');
  formAddBussines.addEventListener('submit', (e) => {
    e.preventDefault();

    let validacion = Fn.validaRut(document.getElementById('rut').value);

    if (validacion) {
      const nombre = document.getElementById('nombre').value;
      const rut = document.getElementById('rut').value;
      let empresas = obtenerLocalStorage('empresas');
      const empresa = new Empresa(empresas.length + 1, nombre, rut);

      agregarEmpresaLocalStorage(empresa);
      empresas = obtenerLocalStorage('empresas');
      renderTable(empresas);
      renderSelect(empresas);
      formAddBussines.reset();
    } else {
      showMessage(`<div class="alert alert-danger" role="alert">
      Rut no válido
    </div>`);
    }

  });

  const formAddImport = document.getElementById('formAddImport');
  formAddImport.addEventListener('submit', (e) => {
    e.preventDefault();
    const id_empresa = parseInt(document.getElementById('id_empresa').value);
    const producto = document.getElementById('producto').value;
    const numero_productos = parseInt(document.getElementById('numero_productos').value);
    const precio_unitario = parseFloat(document.getElementById('precio_unitario').value);


    let empresas = obtenerLocalStorage('empresas')
    let empresa = empresas.find((empresa) => empresa._id == id_empresa);
    let oEmpresa = new Empresa(empresa._id, empresa._nombre, empresa._rut);

    oEmpresa.importaciones = empresa._importaciones;

    const id = oEmpresa.importaciones.length + 1;
    let importacion = new Importacion(id, producto, numero_productos, precio_unitario);

    oEmpresa.importaciones = importacion;
    editarEmpresaLocalStorage(oEmpresa);
    formAddImport.reset();
    document.getElementById('id_empresa').value = id_empresa;
  }
  );

});

