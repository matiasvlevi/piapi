import Logger from "../index";

export function getNbCol(this: Logger) {
  let sum: number = 0;
  for (let chart in this.config.charts) {
    sum += this.config.charts[chart].data.length;
  }
  return sum;
}