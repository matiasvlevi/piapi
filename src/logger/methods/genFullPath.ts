import Logger from "../index";

export function genFullPath(this: Logger) {
  let name = this.genFileName();
  let path = `${this.path}${name}`;
  return path;
}