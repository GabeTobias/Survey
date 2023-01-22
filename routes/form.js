const express = require('express');

const router = express.Router();

const { getForm, postResults, cancelForm } = require('../controllers/form');

router.get('/Survey/:id', getForm);
router.get('/Survey/:id/cancel', cancelForm);
router.post('/Survey/:id/complete', postResults);

module.exports = router;