"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNbCol = void 0;
function getNbCol() {
    let sum = 0;
    for (let chart in this.config.charts) {
        sum += this.config.charts[chart].length;
    }
    return sum;
}
exports.getNbCol = getNbCol;
