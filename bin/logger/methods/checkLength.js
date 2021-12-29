"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLength = void 0;
function checkLength(list, n) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].length !== n) {
            return false;
        }
    }
    return true;
}
exports.checkLength = checkLength;
