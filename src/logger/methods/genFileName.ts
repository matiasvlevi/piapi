import Logger from "..";

export function genFileName(this: Logger): string {
  let id = Logger.genID();
  let name = `${this.logname}-${this.config.charts.length}-${id}.csv`;
  return name
}