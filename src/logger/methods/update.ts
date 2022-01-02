import { exec } from "child_process";
import * as util from 'util';
import Logger from "../index";


const exec_ = util.promisify(exec);

function delay(time: number) {
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

async function update(this: Logger) {
  await delay(+this.config.freq);

  this.chartsConfig = {};
  let ans: string[] = [];
  for (let chart in this.config.charts) {
    this.chartsConfig[chart] = {};
    for (let i = 0; i < this.config.charts[chart].data.length; i++) {
      let command = this.config.charts[chart].data[i];

      const { stdout } = await exec_(command.cmd);
      ans.push(stdout.replace('\n', '').replace(',', ''));

    }
    if (Object.keys(this.config.charts[chart]).includes('bounds')) {
      this.chartsConfig[chart]['bounds'] = this.config.charts[chart].bounds;
    }
    // TODO:
    // colors, style, for each chart

  }
  try {
    let neofetch = (await exec_(`neofetch --stdout`)).stdout
    this.fetch = neofetch;
  } catch (e) {
    this.fetch = 'neofetch not found on host device';
  }
  this.logData(ans);
  this.write();
  this.update();
}
export { update };