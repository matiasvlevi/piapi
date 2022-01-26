import Logger from '../def'

function makeJSON(this: Logger) {

  let header = this.makeHeader();
  let length: number = this.stream.length;
  let data: any = {};
  for (let chart in this.config.charts) {
    let chartname = chart.toLocaleLowerCase();
    data[chartname] = {};
    data[chartname].data = {};
    let currentChart = this.config.charts[chart];
    for (let i = 0; i < currentChart.data.length; i++) {
      data[chartname].data[currentChart.data[i].name.toLocaleLowerCase()] = [];
    }
  }

  for (let chart in this.config.charts) {
    let currentChart = this.config.charts[chart];
    let chartname = chart.toLocaleLowerCase();
    for (let i = 0; i < currentChart.data.length; i++) {
      let h = header.indexOf(currentChart.data[i].name);
      for (let j = 0; j < this.stream.length; j++) {
        data[chartname].data[currentChart.data[i].name.toLocaleLowerCase()].push(this.stream[j][h])
      }
    }

    // Add relevant options to the web application
    let optionKeys = ['bounds', 'responsivePointSize', 'pointSize', "unit"];
    for (let key of optionKeys) {
      if (Object.keys(this.config.charts[chart]).includes(key)) {
        data[chartname][key.toLocaleLowerCase()] = this.config.charts[chart][key];
      }
    }

  }

  let content = {
    header,
    data,
    length,
    freq: this.config.freq,
    fetch: this.fetch
  };
  // JSON sent to the Web App 
  return content;
}
export { makeJSON };