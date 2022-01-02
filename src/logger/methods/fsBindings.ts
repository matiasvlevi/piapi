import * as fs from 'fs';

const readFile = (path: string) => fs.readFileSync(path, 'utf8');

const writeFile = (path: string, data: string) => fs.writeFileSync(path, data, 'utf8');

const fileExists = (path: string) => fs.existsSync(path);

export { readFile, writeFile, fileExists }