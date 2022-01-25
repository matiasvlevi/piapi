import Logger from "../index";

/**
 * Display a string in the console, with a time and date record.
 * @method log
 * @param msg string to display in the console
 */
export function log(this: Logger, msg: string) {
  let date = Logger.getDateString('/');
  let time = Logger.getTimeString(':');
  let message = `[\x1b[36m${date}\x1b[0m] <\x1b[32m${time}\x1b[0m> ${msg}`;

  // Log with color
  console.log(message);

  // Write without color
  this.logstream += `${Logger.removeColors(message)}\n`;
}

export function configErr(stderr: string) {
  if (stderr !== null) {
    console.error(stderr);
    console.log(`\nPlease configure the '.apirc' file`);
    return true;
  }
  return false;
}