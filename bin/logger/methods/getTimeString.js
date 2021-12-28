"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeString = void 0;
function getTimeString(j) {
    let a = new Date();
    return `${a.getHours()}${j}${a.getMinutes()}`;
}
exports.getTimeString = getTimeString;
