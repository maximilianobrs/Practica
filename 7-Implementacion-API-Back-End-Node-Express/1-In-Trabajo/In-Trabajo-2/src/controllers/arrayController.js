const data = []

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

export const getArrays = (req, res) => {
    try {
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}

export const postArray = (req, res) => {
    try {
        const item = req.body;


        if (item === undefined || Object.keys(item).length === 0) {
            return res.status(200).json({ err: 'Error sin contenido', msg: 'La solicitud fue exitosa, pero sin contenido para agregar' });
        }

        const id = data.length + 1;

        const rest = {
            id,
            url: `http://localhost:9000/api/v1/datas/${id}`,
            item
        };
        data.push(rest);

        res.status(200).json({ msg: 'Elemento agregado correctamente al array' });

    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}

export const putArray = (req, res) => {
    try {
        const { id } = req.params;
        const item = req.body;

        const resultIndex = data.findIndex(element => element.id === parseInt(id))

        if (resultIndex === -1) {
            return res.status(404).json({ err: 'Elemento no encontrado', msg: 'El elemento buscado no se encuentra en la data' });
        }
        if (item === undefined || Object.keys(item).length === 0) {
            return res.status(200).json({ err: 'Error sin contenido', msg: 'La solicitud fue exitosa, pero sin contenido para agregar' });
        }

        data[resultIndex].item = item

        res.status(200).json({ msg: 'Elemento actualizado correctamente en la data' });
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor' });
        console.log('Error interno del servidor', error);
    }
}