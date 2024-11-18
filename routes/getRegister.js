const {Router} = require('express');
const router = Router();

const { getParams } = require('../controller/getRegister');

router.get('/getRegister', getParams);
module.exports = router;
