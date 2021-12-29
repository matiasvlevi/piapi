import Logger from "../index";

export function logData(this: Logger, values: string[]): void {
  this.stream.push(values.map(y => y.replace('\r', '')));
  let ans: string[] = [];
  for (let i = 0; i < this.config.logs.length; i++) {
    ans.push(`${this.config.logs[i].name}: ${values[i]}`);
  }
  let completemsg = ans.map(x => x.replace('\r', '')).join('  ');
  this.log(completemsg)
}