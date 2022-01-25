export function configErr(stderr: string, msg: string) {
  if (stderr.length > 0) {
    console.error(stderr);
    console.log(msg);
    return true;
  }
  return false;
}