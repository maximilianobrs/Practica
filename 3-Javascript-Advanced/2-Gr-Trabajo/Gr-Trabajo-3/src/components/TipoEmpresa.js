export default class TipoEmpresa {
  constructor(rubro, tamanio) {
    this._rubro = rubro
    this._tamanio = tamanio
    this._tamanioposibles = ['Pequeña', 'Mediana', 'Grande']
  }
  get rubro() {
    return this._rubro
  }
  set rubro(value) {
    this._rubro = value
  }
  get tamanio() {
    return this._tamanio
  }
  set tamanio(value) {
    this._tamanioposibles.forEach((tamanioposible) => {
      if (tamanioposible === value) {
        this._tamanio = value
      }
    })
  }
  get tamanioposibles() {
    return this._tamanioposibles
  }
  set tamanioposibles(value) { }
}