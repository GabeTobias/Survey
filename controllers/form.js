const { Survey } = require('../models/survey');
const { v4: uuidv4 } = require('uuid');

exports.getForm = async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  const {
    Title,
    Description,
    Questions
  } = survey;

  res.render('form/survey.ejs', { Title, Description, Questions, SurveyID: req.params.id });
};

exports.postResults = async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  console.log(req.body);

  let answer = {
    UUID: uuidv4(),
    Name: req.body[`Question-0`],
    Results: []
  };

  for(let i = 0; i < survey.Questions.length; i++){
    answer.Results.push(req.body[`Question-${i}`]);
  }

  survey.Results.push(answer);
  survey.save();

  res.render('form/complete.ejs', { cancel: false });
};

exports.cancelForm = (req, res) => {
  res.render('form/complete.ejs', {cancel: true});
};

// Survey Link: http://localhost:3000/Survey/63c59a272fe90613d4cf9495