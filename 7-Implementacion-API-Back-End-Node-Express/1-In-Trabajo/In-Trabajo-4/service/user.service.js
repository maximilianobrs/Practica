import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generarToken = (userId) => {
    // Generamos el token con los datos y la clave secreta
    const token = jwt.sign({id:userId}, process.env.SECRETKEY, { expiresIn: 3600000 });
    return token
}

export const verifyToken = (token) => {
    try {
        // Verificamos el token usando la clave secreta
        const verify = jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
            if (err) {
                // El token no es válido
                return ({
                    error: 401,
                    message: 'Token invalido'
                })
            }
            
            // Token válido, podemos acceder a los datos del usuario
            const usuario = decoded;

            return ({ menssaje: "Token válido", usuario });
        });

        return verify
    } catch (error) {
        return ({
            code: error.code || 500,
            message: error.message || 'Ocurrio un error con la verificacion'
        })
    }
}   