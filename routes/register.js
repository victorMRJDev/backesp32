const {Router} = require('express');
const router = Router();

const { registerParams, getParams } = require('../controller/register');
router.post('/register', registerParams);

module.exports = router;