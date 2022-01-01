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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
const exec_ = util.promisify(child_process_1.exec);
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
// Sample fetch debug:
let samplefetch = `` +
    `                vlev@LAPTOP-M0OAND8H\n` +
    `                --------------------\n` +
    `                OS: Linux Mint 20.04.2 LTS on Windows 10 x86_64\n` +
    `                Kernel: 4.4.0-19041-Microsoft\n` +
    `                Uptime: 58 mins\n` +
    `                Packages: 648 (dpkg)\n` +
    `                Shell: zsh 5.8\n` +
    `                Terminal: /dev/tty1\n` +
    `                CPU: Intel i7-10510U (8) @ 2.304GHz\n` +
    `                Memory: 8941MiB / 16134MiB\n`;
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(+this.config.freq);
        this.chartsConfig = {};
        let ans = [];
        for (let chart in this.config.charts) {
            this.chartsConfig[chart] = {};
            for (let i = 0; i < this.config.charts[chart].data.length; i++) {
                let command = this.config.charts[chart].data[i];
                const { stdout } = yield exec_(command.cmd);
                ans.push(stdout.replace('\n', ''));
            }
            if (Object.keys(this.config.charts[chart]).includes('bounds')) {
                this.chartsConfig[chart]['bounds'] = this.config.charts[chart].bounds;
            }
            // TODO:
            // colors, style, for each chart
        }
        try {
            let neofetch = (yield exec_(`neofetch --stdout`)).stdout;
            this.fetch = neofetch;
        }
        catch (e) {
            this.fetch = 'neofetch not found on host device';
        }
        this.logData(ans);
        this.write();
        this.update();
    });
}
exports.update = update;
