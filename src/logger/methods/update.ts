import { exec } from "child_process";
import * as util from 'util';
import Logger from "../index";


const exec_ = util.promisify(exec);

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function update(this: Logger) {
  await delay(+this.config.freq);
  let ans: string[] = [];
  for (let i = 0; i < this.config.logs.length; i++) {
    let command = this.config.logs[i];
    const { stdout } = await exec_(command.cmd);
    ans.push(stdout.replace('\n', ''));
  }
  this.logData(ans);
  this.update();

}
export { update };