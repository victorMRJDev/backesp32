const {response} = require('express');
const {DataRegisterClean} = require('../models/dataClean');
const { Op } = require('sequelize');
const moment = require('moment');

moment.locale('es');

const getParams = async (req, res = response) => {

 try{
    const params = await DataRegisterClean.findAll();

    const groupData = {
        "mayo":[],
        "junio":[],
        "julio":[],
    };
    const groupDataWeeks = {
        "semana":{}
    };

    params.forEach(item => {
        const fecha = moment(item.fecha, 'YYYY-MM-DD');
        const monthName = fecha.format('MMMM');
        // const weekNumber = fecha.isoWeek();
        const startDate = moment('2024-05-16', 'YYYY-MM-DD');
        const weekNumber = Math.floor(moment.duration(fecha.diff(startDate)).asDays() / 7) + 1;

        if(!groupDataWeeks.semana[weekNumber]){
            groupDataWeeks.semana[weekNumber] = [];
        }

        groupDataWeeks.semana[weekNumber].push({
            humedad: item.humedad,
            temperatura: item.temperatura,
            dioxido_carbono: item.dioxido_carbono,
        });
        // console.log(`Fecha: ${item.fecha}, Week Number: ${weekNumber}`); 

        // console.log(`Fecha: ${item.fecha}, MonthName: ${monthName}`); 

        if(groupData[monthName]){
            groupData[monthName].push({
                humedad: item.humedad,
                temperatura: item.temperatura,
                dioxido_carbono: item.dioxido_carbono,
            });
        }
    });
    const averagesWeeks = {};
    for (const week in groupDataWeeks.semana) {
        const weekData = groupDataWeeks.semana[week];
        if (weekData.length > 0) {
            const total = weekData.reduce((acc, item) => {
                return {
                    humedad: acc.humedad + item.humedad,
                    temperatura: acc.temperatura + item.temperatura,
                    dioxido_carbono: acc.dioxido_carbono + item.dioxido_carbono,
                };
            }, { humedad: 0, temperatura: 0, dioxido_carbono: 0 });

            averagesWeeks[week] = {
                averageHumedad: total.humedad / weekData.length,
                averageTemperatura: total.temperatura / weekData.length,
                averageDioxidoCarbono: total.dioxido_carbono / weekData.length
            };
        } else {
            averagesWeeks[week] = {
                averageHumedad: 0,
                averageTemperatura: 0,
                averageDioxidoCarbono: 0
            };
        }
    }
    const averages = {}
    for(const month in groupData){
        const monthData = groupData[month];
        if(monthData.length > 0){
            const total = monthData.reduce((acc, item) => {
                return {
                    humedad: acc.humedad + item.humedad,
                    temperatura: acc.temperatura + item.temperatura,
                    dioxido_carbono: acc.dioxido_carbono + item.dioxido_carbono,
                };
            }, {humedad: 0, temperatura: 0, dioxido_carbono: 0});
            
            averages[month] = {
                averageHumedad: total.humedad / monthData.length,
                averageTemperatura: total.temperatura / monthData.length,
                averageDioxidoCarbono: total.dioxido_carbono / monthData.length
            };
        }else{
            averages[month] = {
                averageHumedad: 0,
                averageTemperatura: 0,
                averageDioxidoCarbono: 0
            };
        }
    }



    res.json({
        ok: true,
        averages,
        averagesWeeks
        // params
    });
 }catch (error){
    console.log('Error fetching parameters', error);
    res.status(500).json({
        ok: false,
        msg: 'Error al obtener datos'
    })
 }
}

module.exports = {
    getParams
}