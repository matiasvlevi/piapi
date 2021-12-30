import Logger from '../index'

export function makeJSON(this: Logger) {

  let header = this.makeHeader();
  let length: number = this.stream.length;
  let data: any = {};
  for (let chart in this.config.charts) {
    data[chart] = {};
    let currentChart = this.config.charts[chart];
    for (let i = 0; i < currentChart.length; i++) {
      data[chart][currentChart[i].name] = [];
    }
  }

  for (let chart in this.config.charts) {
    let currentChart = this.config.charts[chart];

    for (let i = 0; i < currentChart.length; i++) {
      let h = header.indexOf(currentChart[i].name);
      for (let j = 0; j < this.stream.length; j++) {
        data[chart][currentChart[i].name].push(this.stream[j][h])
      }
    }
  }
  let json = JSON.stringify({
    header,
    data,
    length
  });
  return json;
}