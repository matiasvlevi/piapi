import Logger from "../index";

export function makeHeader(this: Logger): string[] {
  let ans: string[] = [];
  for (let i = 0; i < this.config.logs.length; i++) {
    ans.push(this.config.logs[i].name);
  }
  return ans;
}