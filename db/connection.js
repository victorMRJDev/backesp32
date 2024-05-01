const { Sequelize } = require('sequelize');
const db = new Sequelize('biodomestic_register','356504','bio@#$24',{
    host: 'mysql-biodomestic.alwaysdata.net',
    dialect: 'mysql',
}) 
// const dbConnection = async() => {
//     try{
    
//     await db.authenticate();
//     console.log('Conexión a la base de datos exitosa');
//     }catch(error){
//         console.log(error);
//         throw new Error('Error a la hora de iniciar la base de datos');
//     }
// }

module.exports = {
    db
}