const {response} = require('express');
const {DataRegister} = require('../models/registerData');


const registerParams = async(req, res = response) => {

    // const {hora, fecha, metano, dioxido_carbono, temperatura, humedad, ph} = req.body;

    dataRegist = new DataRegister(req.body);
    console.log(req.body)

    await dataRegist.save();


    res.status(201).json({
       ok: true,
       msg: 'registro',
       user: req.body
    });

}

module.exports = { 
    registerParams
 }




