"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genFileName = void 0;
const __1 = __importDefault(require(".."));
function genFileName() {
    let id = __1.default.genID();
    let name = `${this.logname}-${this.config.logs.length}-${id}.csv`;
    return name;
}
exports.genFileName = genFileName;
