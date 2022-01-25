import Logger from '../index'

export function makeJSON(this: Logger) {

  let header = this.makeHeader();
  let length: number = this.stream.length;
  let data: any = {};
  for (let chart in this.config.charts) {
    data[chart] = {};
    data[chart].data = {};
    let currentChart = this.config.charts[chart];
    for (let i = 0; i < currentChart.data.length; i++) {
      data[chart].data[currentChart.data[i].name] = [];
    }
  }

  for (let chart in this.config.charts) {
    let currentChart = this.config.charts[chart];

    for (let i = 0; i < currentChart.data.length; i++) {
      let h = header.indexOf(currentChart.data[i].name);
      for (let j = 0; j < this.stream.length; j++) {
        data[chart].data[currentChart.data[i].name].push(this.stream[j][h])
      }
    }

    // Add relevant options to the web application
    let optionKeys = ['bounds', 'responsivePointSize', 'pointSize'];
    for (let key of optionKeys) {
      if (Object.keys(this.config.charts[chart]).includes(key)) {
        data[chart][key] = this.config.charts[chart][key];
      }
    }

  }

  // JSON sent to the Web App 
  let json = JSON.stringify({
    header,
    data,
    length,
    freq: this.config.freq,
    fetch: this.fetch
  });
  return json;
}