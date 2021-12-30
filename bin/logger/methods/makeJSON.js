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
    for (let chart in this.config.charts) {
        let currentChart = this.config.charts[chart];
        for (let i = 0; i < currentChart.length; i++) {
            let h = header.indexOf(currentChart[i].name);
            for (let j = 0; j < this.stream.length; j++) {
                data[chart][currentChart[i].name].push(this.stream[j][h]);
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
exports.makeJSON = makeJSON;
