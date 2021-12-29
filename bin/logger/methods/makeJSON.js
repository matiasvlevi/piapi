"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJSON = void 0;
function makeJSON() {
    // console.log(this.stream);
    let header = this.makeHeader();
    let length = this.stream.length;
    let data = {};
    for (let i = 0; i < header.length; i++) {
        data[header[i]] = [];
    }
    for (let k = 0; k < this.stream.length; k++) {
        for (let i = 0; i < this.stream[k].length; i++) {
            data[header[i]].push(this.stream[k][i]);
        }
    }
    let json = JSON.stringify({
        header,
        data,
        length
    });
    return json;
}
exports.makeJSON = makeJSON;
