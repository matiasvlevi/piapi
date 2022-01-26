import Logger from "../def";

export function genFullPath(this: Logger) {
  let name = this.genFileName();
  let path = `${this.path}${name}`;
  return path;
}