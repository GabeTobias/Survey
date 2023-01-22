const { Survey } = require('../models/survey');


exports.formList = async (req, res) => {
  console.log("Loaded");
  let surveys = await Survey.find({ Creator: req.session.user.Email });

  res.render('admin/dashboard.ejs', {
    surveys
  });
};

exports.SurveyVerification = async (req, res, next) => {
  const survey = await Survey.findById(req.params.id);
  
  if(survey.Creator != req.session.user.Email){
    return res.redirect('/admin');
  }

  next();
}

exports.surveyPage = async (req, res) => {
  let survey = await Survey.findById(req.params.id);

  res.render('admin/survey.ejs', {
    survey
  });
};

exports.CreateSurvey = async (req, res) => {
  let form = req.body;
  let survey = new Survey({ 
    Title: form.surveyName, 
    Description: form.surveyDescription,
    Creator: req.session.user.Email
  });

  await survey.save();
  
  res.redirect(`/admin/survey/${survey._id}`);
};

exports.DeleteSurvey = async (req, res) => {
  let survey = await Survey.findById(req.params.id);

  survey.delete();

  res.redirect('/admin');
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