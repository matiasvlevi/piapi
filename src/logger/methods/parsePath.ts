export function parsePath(path: string) {
  if (path[path.length - 1] !== '/') {
    path += '/'
  }
  return path;
}