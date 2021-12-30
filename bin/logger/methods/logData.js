"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logData = void 0;
function logData(values) {
    this.stream.push(values.map(y => y.replace('\r', '')));
    let ans = [];
    for (let chart in this.config.charts) {
        for (let i = 0; i < this.config.charts[chart].length; i++) {
            ans.push(`${this.config.charts[chart][i].name}: ${values[i]}`);
        }
    }
    let completemsg = ans.map(x => x.replace('\r', '')).join('  ');
    this.log(completemsg);
}
exports.logData = logData;
