import * as fs from 'fs';
import Logger from '../index';

export function initStream(this: Logger) {
  let path = this.genFullPath();
  let header: string[] = [];
  let csv: string[][] = [];
  if (!fs.existsSync(path)) {
    return {
      header,
      csv
    };
  } else {
    let file = fs.readFileSync(path, 'utf8');

    let lines = file.split('\n');
    header = lines.splice(0, 1)[0].split(',');
    csv = lines.map(x => x.split(',').map(y => y.replace('\r', '')));
    let valid = Logger.checkLength(csv, this.config.logs.length);
    if (!valid) {
      Logger.error('File tried loading a csv with some missing values');
      return {
        header: [],
        csv: []
      }
    }
    return {
      header,
      csv
    };
  }
}