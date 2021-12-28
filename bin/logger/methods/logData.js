"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logData = void 0;
function logData(values) {
    this.stream.push(values);
    let ans = [];
    for (let i = 0; i < this.config.logs.length; i++) {
        ans.push(`${this.config.logs[i].name}: ${values[i]}`);
    }
    let completemsg = ans.map(x => x.replace('\r', '')).join('  ');
    this.log(completemsg);
}
exports.logData = logData;
