"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHeader = void 0;
function makeHeader() {
    let ans = [];
    for (let chart in this.config.charts) {
        for (let i = 0; i < this.config.charts[chart].length; i++) {
            ans.push(this.config.charts[chart][i].name);
        }
    }
    return ans;
}
exports.makeHeader = makeHeader;
