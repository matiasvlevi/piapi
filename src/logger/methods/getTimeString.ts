export function getTimeString(j: string) {
  let a = new Date();
  let hour: string = `${a.getHours()}`;
  let min: string = `${a.getMinutes()}`;
  if (hour.length < 2) {
    let s = `0${hour}`;
    hour = s;
  }
  if (min.length < 2) {
    let s = `0${min}`;
    min = s;
  }
  return `${hour}${j}${min}`;
}