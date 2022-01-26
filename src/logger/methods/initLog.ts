import Logger from "../def";


export function initLog(this: Logger) {
  // Get the text log path
  let logpath = `${this.genFullPath()}.log`;

  // Load logs
  if (Logger.fileExists(logpath)) {
    this.logstream = Logger.readFile(logpath)
  }
} 