const express = require('express');

const router = express.Router();

const { getForm, postResults, cancelForm } = require('../controllers/form');

router.get('/:id', getForm);
router.get('/:id/cancel', cancelForm);
router.post('/:id/complete', postResults);

module.exports = router;