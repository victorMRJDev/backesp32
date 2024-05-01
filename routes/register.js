const {Router} = require('express');
const router = Router();

const { registerParams } = require('../controller/register');


router.post('/register', registerParams);


module.exports = router;