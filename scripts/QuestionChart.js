class QuestionChart {
  constructor(QuestionResult, index){
    this.results = QuestionResult.answers;
    this.question = QuestionResult.question;
    this.index = index;
  }

  getElement(){
    return document.getElementById(this.question.Text);
  }

  abreviate(text){
    if(text.length > 15)
      return text.substr(0, 15) + "...";
    else
      return text;
  }

  GenerateData(){
    let labels = [];
    let data = [];

    for(let i = 0; i < this.results.length; i++){
      let value = this.results[i];
      let found = false;
      
      for(let j = 0; j < labels.length; j++){
        if(labels[j] == value){
          data[j]++;
          found = true;
        }
      }

      if(!found){
        labels.push(this.abreviate(value));
        data.push(1);
      }
    }

    return {
      labels,
      data
    };
  }

  BarGraph(ctx, chartData){
    new Chart(ctx, {
      type: 'bar',
      maintainAspectRatio: false,
      data: {
        labels: chartData.labels,
        datasets: [{
          label: '# of Responses',
          data: chartData.data,
          borderWidth: 1
        }]
      }
    });
  }

  PieGraph(ctx, chartData){
    new Chart(ctx, {
      type: 'doughnut',
      maintainAspectRatio: false,
      data: {
        labels: chartData.labels,
        datasets: [{
          label: '# of Responses',
          data: chartData.data,
          borderWidth: 1
        }]
      }
    });
  }

  GenerateChart(ctx){
    let chartData = this.GenerateData();

    if(this.question.Options.length > 0 || this.question.Type == "Integer"){
      this.PieGraph(ctx, chartData);
    } else {
      this.BarGraph(ctx, chartData);
    }
  }

  Render(){
    let elem = this.getElement();
    let chartID = `Chart-${this.question.Text}`;

    //if(this.question.Type == "Long Text") return;

    elem.innerHTML = `
      <a href="#" data-index="${this.index}" class="text-decoration-none text-reset" onclick="OpenSheet(this.dataset.index)">
        <h6> ${this.question.Text} </h6>
        <canvas id="${chartID}"></canvas>
      </a>
    `;

    let chartCanvas = document.getElementById(chartID);
    this.GenerateChart(chartCanvas);

    chartCanvas.style.minHeight = "620";
  }
}