
import Logger from "../index";

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function update(this: Logger) {
  await delay(+this.config.freq);


  let ans: string[] = [];
  for (let chart in this.config.charts) {

    for (let i = 0; i < this.config.charts[chart].data.length; i++) {
      let command = this.config.charts[chart].data[i];
      try {
        let { stdout } = await Logger.exec(command.cmd);
        ans.push(stdout.replace('\n', '').replace(',', ''));
      } catch (e) {
        console.error(e);
        console.log(`\nSERVERFETCH: \x1b[31m Please configure the '.apirc' file with valid system commands \x1b[0m`);
        return;
      }
    }
  }

  // If neofetch is installed, use neofetch
  try {
    let { stdout } = await Logger.exec(`neofetch --stdout`);
    this.fetch = stdout;
  } catch (e) {
    console.error(e);
    console.log(`\n\x1b[34mNeofetch not installed \x1b[0m`);
    this.fetch = 'neofetch not found on host device';
  }

  // Display in console
  this.logData(ans);

  // Write files
  this.write();

  // Re-log
  this.update();
}
export { update };