import * as methods from './methods';
import config from './config';

export default class Logger {
  stream: string[][];
  config: any;
  constructor(config_: any = config) {
    this.stream = [];
    this.config = config_;
  }
  static config = config;
  public static getTimeString = methods.getTimeString;
  public static getDateString = methods.getDateString;

  public logData = methods.logData.bind(this);
  public log = methods.log.bind(this);
  public update = methods.update.bind(this);
}