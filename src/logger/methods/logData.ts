
import Logger from "../index";

export function logData(this: Logger, values: string[]): void {
  this.stream.push(values.map(y => y.replace('\r', '')));
  let ans: string[] = [];
  let j = 0;

  for (let chart in this.config.charts) {
    for (let i = 0; i < this.config.charts[chart].length; i++) {
      let index = (j * Object.keys(this.config.charts).length) + i;

      ans.push(`${this.config.charts[chart][i].name}: ${values[index]} `);
    }
    j++;
  }
  let completemsg = ans.map(x => x.replace('\r', '')).join('  ');
  this.log(completemsg)
}