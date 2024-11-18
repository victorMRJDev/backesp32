const { Sequelize } = require('sequelize');
const db = new Sequelize('biodomestic_register','356504','bio@#$24',{
    host: 'mysql-biodomestic.alwaysdata.net',
    dialect: 'mysql',
}) 
module.exports = {
    db
}