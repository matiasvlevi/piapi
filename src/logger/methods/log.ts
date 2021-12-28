import Logger from "..";

export function log(this: Logger, msg: string) {
  let date = Logger.getDateString('/');
  let time = Logger.getTimeString(':');
  console.log(`[\x1b[36m${date}\x1b[0m] <\x1b[32m${time}\x1b[0m> ${msg}`);
}