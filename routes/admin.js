const express = require('express');

const router = express.Router();

const { formList, surveyPage, PostSurvey, AddQuestion, DeleteQuestion, SurveyVerification, CreateSurvey, DeleteSurvey, ResultsPage, SurveyJSON } = require('../controllers/admin');

router.get('/', formList);
router.get('/survey/:id', SurveyVerification, surveyPage);
router.get('/results/:id', SurveyVerification, ResultsPage);
router.get('/deleteSurvey/:id', SurveyVerification, DeleteSurvey);
router.get('/surveyJSON/:id', SurveyVerification, SurveyJSON);
router.post('/createSurvey', CreateSurvey);
router.post('/postSurvey', PostSurvey);
router.post('/addQuestion', AddQuestion);
router.post('/deleteQuestion', DeleteQuestion);


module.exports = router;