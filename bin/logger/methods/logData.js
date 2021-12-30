"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logData = void 0;
function logData(values) {
    this.stream.push(values.map(y => y.replace('\r', '')));
    let ans = [];
    let j = 0;
    for (let chart in this.config.charts) {
        let len = this.config.charts[chart].length;
        for (let i = 0; i < len; i++) {
            let index = j + i;
            ans.push(`${this.config.charts[chart][i].name}: ${values[index]} `);
        }
        j += len;
    }
    let completemsg = ans.map(x => x.replace('\r', '')).join('  ');
    this.log(completemsg);
}
exports.logData = logData;
