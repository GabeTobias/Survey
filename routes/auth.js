const express = require('express');

const router = express.Router();

const { getLogin, getRegister, postRegister, postLogin, postLogout } = require('../controllers/auth');

router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/logout', postLogout);
router.post('/postRegister', postRegister);
router.post('/postLogin', postLogin);

module.exports = router;