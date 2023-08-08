import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//controlador para la subida de imagenes a la carpeta uploads
export const postImg = (req, res) => {
    try {
        //verificando si se subio un archivo si no muestra un mensaje.
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ code: 400, message: 'No se encontraron archivos para cargar' });
        }
        //formatos permitidos.
        const validFormats = [".jpg", ".jpeg", ".png", ".gif", ".svg"];

        //obteniedo el formato del archivo subido.
        const formatName = path.extname(req.files.myFile.name)

        //validacion de los fomatos permitidos.
        if (!validFormats.includes(formatName)) {
            return res.status(400).json({ code: 400, message: "Formato de archivo no válido" })
        }
        
        //si todo esta bien subira el archivo a la carpeta uploads
        const uploadedFile = req.files.myFile;
        const uploadPath = `${__dirname}../../uploads/${uploadedFile.name}`;
        uploadedFile.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ code: 200, message: 'Archivo cargado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error interno del servidor' })
    }
};

//controlador para la ruta del html.
export const getHTML = (req, res) => {
    res.render('index');
};