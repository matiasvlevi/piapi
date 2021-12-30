"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJSON = void 0;
function makeJSON() {
    // console.log(this.stream);
    let header = this.makeHeader();
    let length = this.stream.length;
    let data = {};
    for (let chart in this.config.charts) {
        data[chart] = {};
        let currentChart = this.config.charts[chart];
        for (let i = 0; i < currentChart.length; i++) {
            data[chart][currentChart[i].name] = [];
        }
    }
    console.log(data);
    for (let chart in this.config.charts) {
        let currentChart = this.config.charts[chart];
        for (let i = 0; i < currentChart.length; i++) {
            let h = header.indexOf(currentChart[i].name);
            console.log(chart, currentChart[i].name, data[chart][currentChart[i].name]);
            for (let j = 0; j < this.stream.length; j++) {
                data[chart][currentChart[i].name].push(this.stream[j][h]);
            }
        }
    }
    // for (let k = 0; k < this.stream.length; k++) {
    //   for (let i = 0; i < this.stream[k].length; i++) {
    //     data[header[i]].push(this.stream[k][i]);
    //   }
    // }
    let json = JSON.stringify({
        header,
        data,
        length
    });
    return json;
}
exports.makeJSON = makeJSON;
