import * as methods from './methods';
import config from './config';

export default class Logger {

  stream: string[][];
  config: any;
  path: string;
  logname: string;
  header: string[];
  fetch: string;
  fileIndex: number;
  logstream: string;

  constructor(config_: any = config) {
    this.config = config_;
    this.logname = config_.env.LOGNAME;
    this.path = Logger.parsePath(config_.env.WRITEPATH);
    let data = this.initStream();
    this.stream = data.csv;
    this.header = data.header;
    this.fetch = '';
    this.fileIndex = 0;
    this.logstream = '';
  }

  static config = config;

  public static parsePath = methods.parsePath;
  public static getTimeString = methods.getTimeString;
  public static getDateString = methods.getDateString;
  public static genID = methods.genID;
  public static checkLength = methods.checkLength;
  public static error = methods.error;
  public static exec = methods.exec;
  public static readFile = methods.readFile;
  public static writeFile = methods.writeFile;
  public static fileExists = methods.fileExists;
  public static removeColors = methods.removeColors;
  public static configErr = methods.configErr;

  public initStream = methods.initStream.bind(this);
  public logData = methods.logData.bind(this);
  public log = methods.log.bind(this);
  public update = methods.update.bind(this);
  public write = methods.write.bind(this);
  public makeHeader = methods.makeHeader.bind(this);
  public genFullPath = methods.genFullPath.bind(this);
  public genFileName = methods.genFileName.bind(this);
  public makeJSON = methods.makeJSON.bind(this);
  public getNbCol = methods.getNbCol.bind(this);
}