export function getTimeString(j: string) {
  let a = new Date();
  return `${a.getHours()}${j}${a.getMinutes()}`;
}