"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
function getDateString(j) {
    let a = new Date();
    return `${a.getDate()}${j}${a.getMonth()}${j}${a.getFullYear()}`;
}
exports.getDateString = getDateString;
