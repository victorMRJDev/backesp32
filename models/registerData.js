const {Sequelize, DataTypes, Model} = require('sequelize');
const { db } = require('../db/connection');

    const DataRegister = db.define(
        'registers',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            hora: {
                type: DataTypes.TIME
            },
            fecha:{
                type: DataTypes.DATE
            },
            metano:{
                type: DataTypes.DOUBLE
            },
            dioxido_carbono:{
                type: DataTypes.DOUBLE
            },
            temperatura:{
                type: DataTypes.DOUBLE
            },
            tempExterna:{
                type: DataTypes.DOUBLE
            },
            humedad:{
                type: DataTypes.DOUBLE
            },
            ph:{
                type: DataTypes.DOUBLE
            },
            createdAt:{
                type: DataTypes.DATE
            },
            updatedAt:{
                type: DataTypes.DATE
            }
        }, {tablename: 'registers'}
    )
    // return DataSchema;
// }
module.exports = {DataRegister};