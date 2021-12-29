"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHeader = void 0;
function makeHeader() {
    let ans = [];
    for (let i = 0; i < this.config.logs.length; i++) {
        ans.push(this.config.logs[i].name);
    }
    return ans;
}
exports.makeHeader = makeHeader;
