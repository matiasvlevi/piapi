import { exec as exec_ } from "child_process";
import * as util from 'util';

const exec = util.promisify(exec_);

export { exec }