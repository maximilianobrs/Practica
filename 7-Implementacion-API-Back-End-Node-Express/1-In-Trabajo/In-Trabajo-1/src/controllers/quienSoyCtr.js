
export const getquienSoy = (req, res)=>{
 try {
    res.status(200).json({msg:'Hola soy maximiliano'})
 } catch (error) {
    res.status(500).json({error:`${error}`,msg:'Ocurrio un error al ralizar la peticion'});
    console.log('Ocurrio un error al ralizar la peticion:',error);
 }
}