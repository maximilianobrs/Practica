import app from './app.js'
import { sequelize } from './db/database.js'
import './models/models.js'

const main = async()=>{
    try {
        await sequelize.sync()
        app.listen(4000,()=> console.log('server arriba en el puerto 4000'))
    } catch (error) {
        console.log(error);
    }
}
main();






