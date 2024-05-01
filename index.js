const express = require('express');
require('dotenv').config();
const {db} = require('./db/connection');

// Crear un servidor de Express
const app = express();

//Base de datos
// dbConnection();
async function dbConnection(){
    try {

        await db.authenticate();
        console.log("DB online")

    } catch (error) {
        console.error('Error',error)
        // throw new Error(error);
    }
}


//Directorio publico
app.use(express.static('public'));





//Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/register', require('./routes/register'));
// app.get('/', (req, res) => {
   
//     res.json({
//         "ok": true,
//     });
// });


app.listen(3000, () => {
    console.log(`Servidor en puerto 3000 ${3000}`);
    dbConnection();
});

