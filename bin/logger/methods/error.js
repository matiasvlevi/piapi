"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
function error(msg) {
    console.error(`\x1b[34m PI-API ERROR :: ${msg} \x1b[0m`);
}
exports.error = error;
