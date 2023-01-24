(async function(){
  let split = document.URL.split('/');
  let SurveyID = split[split.length-1];
  let surveyReq = await fetch(`../surveyJSON/${SurveyID}`);
  let survey = await surveyReq.json();

  let responseMap = [];
  let questionCharts = [];

  survey.Questions.forEach((element, index) => {
    responseMap[index] = {
      question: element,
      answers: []
    };   
  });

  survey.Results.forEach((response) => {
    for(let i = 0; i < response.Results.length; i++){
      responseMap[i].answers.push(response.Results[i]);
    }
  });

  responseMap.forEach((response, index) => {
    let chart = new QuestionChart(response, index);
    chart.Render();
    questionCharts.push(chart);
  });

})()