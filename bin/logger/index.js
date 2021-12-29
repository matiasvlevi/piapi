"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const methods = __importStar(require("./methods"));
const config_1 = __importDefault(require("./config"));
class Logger {
    constructor(config_ = config_1.default) {
        this.initStream = methods.initStream;
        this.logData = methods.logData.bind(this);
        this.log = methods.log.bind(this);
        this.update = methods.update.bind(this);
        this.write = methods.write.bind(this);
        this.makeHeader = methods.makeHeader.bind(this);
        this.genFullPath = methods.genFullPath.bind(this);
        this.genFileName = methods.genFileName.bind(this);
        this.makeJSON = methods.makeJSON.bind(this);
        this.config = config_;
        this.logname = config_.env.LOGNAME;
        this.path = Logger.parsePath(config_.env.WRITEPATH);
        let data = this.initStream();
        this.stream = data.csv;
        this.header = data.header;
    }
}
exports.default = Logger;
Logger.config = config_1.default;
Logger.parsePath = methods.parsePath;
Logger.getTimeString = methods.getTimeString;
Logger.getDateString = methods.getDateString;
Logger.genID = methods.genID;
Logger.checkLength = methods.checkLength;
Logger.error = methods.error;
