export function checkLength(list: string[][], n: number): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i].length !== n) {
      return false;
    }
  }
  return true;
}