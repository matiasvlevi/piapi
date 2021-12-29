export function genID(): string {
  let d = new Date();
  return `${d.getDate()}${d.getMonth()}${d.getFullYear()}${d.getHours()}`;
}