import { exec } from "child_process";
import * as util from 'util';
import Logger from "../index";


const exec_ = util.promisify(exec);

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function update(this: Logger) {
  await delay(+this.config.freq);

  this.chartsConfig = {};
  let ans: string[] = [];
  for (let chart in this.config.charts) {
    this.chartsConfig[chart] = [];

    for (let i = 0; i < this.config.charts[chart].length; i++) {
      let command = this.config.charts[chart][i];
      const { stdout } = await exec_(command.cmd);
      ans.push(stdout.replace('\n', ''));
      this.chartsConfig[chart].push(command.name)
    }

  }
  this.logData(ans);
  this.write();
  this.update();
}
export { update };