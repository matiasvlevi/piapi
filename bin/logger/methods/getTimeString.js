"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeString = void 0;
function getTimeString(j) {
    let a = new Date();
    let hour = `${a.getHours()}`;
    let min = `${a.getMinutes()}`;
    if (hour.length < 2) {
        let s = `0${hour}`;
        hour = s;
    }
    if (min.length < 2) {
        let s = `0${min}`;
        min = s;
    }
    return `${hour}${j}${min}`;
}
exports.getTimeString = getTimeString;
