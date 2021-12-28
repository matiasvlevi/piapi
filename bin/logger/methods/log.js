"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const __1 = __importDefault(require(".."));
function log(msg) {
    let date = __1.default.getDateString('/');
    let time = __1.default.getTimeString(':');
    console.log(`[\x1b[36m${date}\x1b[0m] <\x1b[32m${time}\x1b[0m> ${msg}`);
}
exports.log = log;
