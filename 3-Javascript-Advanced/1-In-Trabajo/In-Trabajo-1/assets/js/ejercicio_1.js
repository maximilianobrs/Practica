function Consultorio(nombre, paciente) {

    let _nombre = nombre;
    let _paciente = paciente || [];

    Object.defineProperty(this, '_getNombre', {
        get: function () {
            return _nombre;
        }
    });

    Object.defineProperty(this, '_getPaciente', {
        get: function () {
            return _paciente;
        }
    });

    Object.defineProperty(this, '_setNombre', {
        set: function (nombre) {
            _nombre = nombre
        }
    });
    Object.defineProperty(this, '_setPaciente', {
        set: function (paciente) {
            _paciente = paciente
        }
    });
}

function Paciente(nombre, edad, rut, diagnostico) {
    let _nombre = nombre;
    let _edad = edad;
    let _rut = rut;
    let _diagnostico = diagnostico;

    Object.defineProperty(this, "_getNombre", {
        get: function () {
            return _nombre
        }
    })
    Object.defineProperty(this, "_getEdad", {
        get: function () {
            return _edad
        }
    })
    Object.defineProperty(this, "_getRut", {
        get: function () {
            return _rut
        }
    })
    Object.defineProperty(this, "_getDiagnostico", {
        get: function () {
            return _diagnostico
        }
    })
    Object.defineProperty(this, "_setNombre", {
        set: function (nombre) {
            _nombre = nombre
        }
    })
    Object.defineProperty(this, "_setEdad", {
        set: function (edad) {
            _edad = edad
        }
    })
    Object.defineProperty(this, "_setRut", {
        set: function (rut) {
            _rut = rut
        }
    })
    Object.defineProperty(this, "_setDiagnostico", {
        set: function (diagnostico) {
            _diagnostico = diagnostico
        }
    })
}

//==================================================

Consultorio.prototype.getNombre = function(){
    return this._getNombre;
};
Consultorio.prototype.setNombre = function(nombre){
    this._getNombre = nombre;
};

//==================================================

Consultorio.prototype.getPaciente = function(){
    return this._getPaciente;
};
Consultorio.prototype.setPaciente = function(paciente){
    this._setPaciente = paciente;
    
};
//==================================================

Paciente.prototype.getNombre = function(){
    return this._getNombre;
};
Paciente.prototype.setNombre = function(nombre){
    this._setNombre = nombre;
};

//==================================================

Paciente.prototype.getEdad = function(){
    return this._getEdad;
};
Paciente.prototype.setEdad = function(edad){
    this._setEdad = edad;
};

//==================================================

Paciente.prototype.getRut = function(){
    return this._getRut;
};
Paciente.prototype.setRut = function(rut){
    this._setRut = rut;
};

//==================================================

Paciente.prototype.getDiagnostico = function(){
    return this._getDiagnostico;
};
Paciente.prototype.setDiagnostico = function(diagnostico){
    this._setDiagnostico = diagnostico;
};

//==================================================



Consultorio.prototype.getNombre = function (nombre) {
    return this._getPaciente.find(paciente => paciente._getNombre.toLowerCase() === nombre.toLowerCase());
}

Consultorio.prototype.mostrarPacientes = function () {
    return this._getPaciente.forEach(function (paciente) {
        console.log("=======================");
        console.log("Nombre: " + paciente._getNombre);
        console.log("Edad: " + paciente._getEdad);
        console.log("RUT: " + paciente._getRut);
        console.log("Diagnóstico: " + paciente._getDiagnostico);
        console.log("=======================");
    });
};



let paciente1 = new Paciente("alex", 20, "12.000.000-9", "bien")
let paciente2 = new Paciente("rober", 30, "15.000.000-9", "mal")
let paciente3 = new Paciente("jhon", 18, "19.000.000-9", "mas o menos")
let consultorio = new Consultorio("alfa", [paciente1, paciente2, paciente3])

paciente1.setDiagnostico("muy bien")
console.log(paciente1._getDiagnostico)
console.log(consultorio.getNombre('jhon'))
consultorio.mostrarPacientes();





