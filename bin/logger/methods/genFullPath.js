"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFullPath = void 0;
function genFullPath() {
    let name = this.genFileName();
    let path = `${this.path}${name}`;
    return path;
}
exports.genFullPath = genFullPath;
