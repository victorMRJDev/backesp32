const {response} = require('express');
const {DataRegister} = require('../models/registerData');


const registerParams = async(req, res = response) => {
    
    var datetime = new Date();
    console.log(datetime.toISOString().slice(0,10));

    var time = datetime.getHours() + ":" +
    datetime.getMinutes() + ":" +
    datetime.getSeconds();

    console.log(time);
    

    console.log(req.body)
    dataRegist = new DataRegister({
        ...req.body,
        hora: time, 
        fecha: datetime.toISOString().slice(0,10), 
        createdAt:datetime.toISOString().slice(0,10)
    });

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




