const { Survey } = require('../models/survey');


exports.formList = async (req, res) => {
  let surveys = await Survey.find();

  res.render('admin/dashboard.ejs', {
    surveys
  });
};

exports.surveyPage = async (req, res) => {
  let survey = await Survey.findById(req.params.id);

  res.render('admin/survey.ejs', {
    survey
  });
};

exports.PostSurvey = async (req, res) => {
  let survey = await Survey.findById(req.body.surveyID);

  survey.Questions.forEach((question, index) => {
    question.Text = req.body[`${index}-Question`];
    question.Type = req.body[`${index}-Type`];

    if(question.Options){
      question.Options = req.body[`${index}-Options`];
    }
  });

  survey.save();

  res.redirect('/admin');
};

exports.AddQuestion = async (req, res) => {
  let survey = await Survey.findById(req.body.surveyID);

  survey.Questions.push({
    Text: "New Question?",
    Type: "Short Text"
  });

  survey.save();

  res.redirect(`/admin/survey/${req.body.surveyID}`);
};

exports.DeleteQuestion = async (req, res) => {
  let survey = await Survey.findById(req.body.surveyID);

  survey.Questions.splice(req.body.deleteIndex, 1);

  survey.save();

  res.redirect(`/admin/survey/${req.body.surveyID}`);
}