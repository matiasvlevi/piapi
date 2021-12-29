import * as methods from './methods';
import config from './config';

export default class Logger {

  stream: string[][];
  config: any;
  path: string;
  logname: string;
  header: string[];

  constructor(config_: any = config) {
    this.config = config_;
    this.logname = config_.env.LOGNAME;
    this.path = Logger.parsePath(config_.env.WRITEPATH);
    let data = this.initStream();
    this.stream = data.csv;
    this.header = data.header;
  }

  static config = config;

  public static parsePath = methods.parsePath;
  public static getTimeString = methods.getTimeString;
  public static getDateString = methods.getDateString;
  public static genID = methods.genID;
  public static checkLength = methods.checkLength;
  public static error = methods.error;

  public initStream = methods.initStream;
  public logData = methods.logData.bind(this);
  public log = methods.log.bind(this);
  public update = methods.update.bind(this);
  public write = methods.write.bind(this);
  public makeHeader = methods.makeHeader.bind(this);
  public genFullPath = methods.genFullPath.bind(this);
  public genFileName = methods.genFileName.bind(this);
  public makeJSON = methods.makeJSON.bind(this);
}