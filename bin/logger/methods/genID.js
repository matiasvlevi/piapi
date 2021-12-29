"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genID = void 0;
function genID() {
    let d = new Date();
    return `${d.getDate()}${d.getMonth()}${d.getFullYear()}${d.getHours()}`;
}
exports.genID = genID;
