async function OpenSheet(index){
  let split = document.URL.split('/');
  let SurveyID = split[split.length-1];
  let surveyReq = await fetch(`../surveyJSON/${SurveyID}`);
  let survey = await surveyReq.json();

  
}