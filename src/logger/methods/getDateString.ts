export function getDateString(j: string) {
  let a = new Date();
  return `${a.getDate()}${j}${a.getMonth()}${j}${a.getFullYear()}`;
}