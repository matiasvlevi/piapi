import * as fs from 'fs';
import Logger from '../def';


/**
 * Read the previous CSV files and load their data. If the csv is missing values, or not formatted in the same way as the new configuration,
 * the logger will record new data and save it in a separate file
 * @method initStream
 * @return Object
 */
export function initStream(this: Logger) {

  // Get the csv path
  let path = `${this.genFullPath()}.csv`;

  let header: string[] = [];
  let csv: string[][] = [];
  if (!Logger.fileExists(path)) {
    return {
      header,
      csv
    };
  } else {
    let file = Logger.readFile(path);

    let lines = file.split('\n');
    header = lines.splice(0, 1)[0].split(',');
    csv = lines.map(x => x.split(',').map(y => y.replace('\r', '')));


    // Perform a check, load empty data
    let valid = Logger.checkLength(csv, this.getNbCol());
    if (!valid) {
      Logger.error('File tried loading a csv with some missing values, the logger will create a new file');
      this.fileIndex++;
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