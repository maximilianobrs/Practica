import express from 'express';
import bodyparser from 'body-parser'; 
import { 
    nuevaEstudiante,
    obtenerEstudiantes,
    editarEstudiante,
    eliminarEstudiante,
    obtenerEstudiante
} from './db/consultas.js' 

console.clear();
const app = express();

// Meddleware
app.use(bodyparser.json())

// Creamos el get para que imprima la tabla
app.get('/estudiantes',async(req,res)=>{
    const estudiante = await obtenerEstudiantes()
    res.send(estudiante)
})

// Creamos el get para que imprima la tabla de un estudiante
app.get('/estudiante/:id',async(req,res)=>{
    const { id } = req.params;
    const estudiante = await obtenerEstudiante(id)
    res.send(estudiante)
})

// Para ingresar las estudiante desde el front
app.post('/estudiantes', async(req,res)=>{
    const estudiante = req.body
    await nuevaEstudiante(estudiante)
    res.send(estudiante)
})

// Para poder guardar una tarea editada PUT
app.put('/estudiantes', async(req,res)=>{
    const estudiante = req.body
    const actualizar = await editarEstudiante(estudiante)
    res.send(actualizar)
})

app.delete('/estudiante/:id', async(req,res)=>{
    const { id } = req.params;
    await eliminarEstudiante(id)
    res.send('Estudiante eliminado')
})
 

app.listen(8080,()=> console.log('Servidor arriba en el puerto 8080'))

