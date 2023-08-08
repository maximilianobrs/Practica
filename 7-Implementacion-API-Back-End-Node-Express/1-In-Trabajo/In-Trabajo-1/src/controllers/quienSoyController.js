// Controlador para la ruta '/QuienSoy'.
export const getquienSoy = (req, res) => {
   try {
      res.status(200).json({ msg: 'Hola soy maximiliano' })
   } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
      console.error('Error interno del servidor:', error);
   }
}