import Logger from '../index';
import * as fs from 'fs';

export function write(this: Logger) {
  let data = this.stream.map(x => x.map(y => y.replace('\r', '')).join(','));
  let header = [this.makeHeader().join(',')];
  let csv = header.concat(data).join('\n');
  let json = this.makeJSON();

  let path = this.genFullPath().replace('.csv', '');
  fs.writeFileSync(`${path}.csv`, csv, 'utf8');
  fs.writeFileSync(`./web/public/${this.config.env.JSONNAME}.json`, json, 'utf8');
}