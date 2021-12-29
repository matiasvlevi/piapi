import Logger from '../index'

export function makeJSON(this: Logger) {
  // console.log(this.stream);
  let header = this.makeHeader();
  let length: number = this.stream.length;
  let data: any = {};
  for (let i = 0; i < header.length; i++) {
    data[header[i]] = [];
  }
  for (let k = 0; k < this.stream.length; k++) {
    for (let i = 0; i < this.stream[k].length; i++) {
      data[header[i]].push(this.stream[k][i]);
    }
  }
  let json = JSON.stringify({
    header,
    data,
    length
  });
  return json;
}