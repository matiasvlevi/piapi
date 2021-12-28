import * as fs from 'fs';
import * as dotenv from 'dotenv';


let config = JSON.parse(fs.readFileSync('./.apirc', 'utf-8'));

config.env = dotenv.config().parsed;

export default config;