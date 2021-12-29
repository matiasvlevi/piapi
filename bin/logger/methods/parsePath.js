"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePath = void 0;
function parsePath(path) {
    if (path[path.length - 1] !== '/') {
        path += '/';
    }
    return path;
}
exports.parsePath = parsePath;
