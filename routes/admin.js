const express = require('express');

const router = express.Router();

const { formList, surveyPage, PostSurvey, AddQuestion, DeleteQuestion } = require('../controllers/admin');

router.get('/admin', formList);
router.get('/admin/survey/:id', surveyPage);
router.post('/admin/postSurvey', PostSurvey);
router.post('/admin/addQuestion', AddQuestion);
router.post('/admin/deleteQuestion', DeleteQuestion);


module.exports = router;