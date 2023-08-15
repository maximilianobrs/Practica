import { generarToken, verifyToken } from '../service/user.service.js';

// Ruta para generar y enviar un token
export const getToken = async (req, res) => {
    // Datos que estaran el incluidos en el token.
    const userData = {
        id: 1,
        username: "Max",
        password: "mipassword"
    };

    try {
        const token = await generarToken(userData.id);
        // Enviamos el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: error.code || 500, message: error.message || 'Error interno del servidor' });
    }
};

// Controlador para verificar el token
export const verificarToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(204).end();
    }

    try {
        const result = await verifyToken(token);

        if (result?.error !== undefined) {
            return res.status(result.error).json({ code: result.error, message: result.message });
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: error.code || 500, message: error.message || 'Error interno del servidor' });
    }
};

