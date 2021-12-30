import Logger from "../index";

export function makeHeader(this: Logger): string[] {
  let ans: string[] = [];
  for (let chart in this.config.charts) {
    for (let i = 0; i < this.config.charts[chart].length; i++) {
      ans.push(this.config.charts[chart][i].name);
    }
  }
  return ans;
}