import data from '../data/array.js'
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT

//controller para obtener el elemento existente con el id.
export const getArray = (req, res) => {
    try {
        const { id } = req.params;
        const test = data.find(element => element.id === parseInt(id))

        if (test === undefined) {
            return res.status(404).json({ err: 'Elemento no encontrado', msg: 'El elemento buscado no se encuentra en la data' });
        }

        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}

//controller para obtener todos los elementos del array.
export const getArrays = (req, res) => {
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}

//controller para agregar un nuevo elemento al array.
export const postArray = (req, res) => {
    try {
        const item = req.body;

        if (item.id) {
            return res.status(400).json({ err: 'Key reservado', msg: 'Key reservada no se puede usar' });
        }
        if (item === undefined || Object.keys(item).length === 0) {
            return res.status(200).json({ err: 'Error sin contenido', msg: 'La solicitud fue exitosa, pero sin contenido para agregar' });
        }

        const newid = data.length + 1;
        const newContent = {
            id: newid,
            ...item,
            link: {
                url: `http://localhost:${port}/api/v1/datas/${newid}`
            }
        };

        data.push(newContent);

        res.status(201).json({ msg: 'Elemento agregado correctamente al array' });

    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}

//controller para actualizar un elemento existente en el array por su ID
export const putArray = (req, res) => {
    try {
        const { id } = req.params;
        const item = req.body;

        const result = data.findIndex(element => element.id === parseInt(id))

        if (item.id) {
            return res.status(400).json({ err: 'Key id reservada', msg: 'Key reservada no se puede usar' });
        }
        if (result === -1) {
            return res.status(404).json({ err: 'Elemento no encontrado', msg: 'El elemento buscado no se encuentra en la data' });
        }
        if (item === undefined || Object.keys(item).length === 0) {
            return res.status(204).end();
        }

        const newId = parseInt(id);

        const newContent = {
            id: newId,
            ...item,
            ...data[result],
            link: {
                url: `http://localhost:${port}/api/v1/datas/${id}`,
            },
        };

        data[result] = newContent

        res.status(200).json({ msg: 'Elemento actualizado correctamente en la data' });
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}