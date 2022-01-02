
import Logger from "../index";

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function update(this: Logger) {
  await delay(+this.config.freq);

  this.chartsConfig = {};
  let ans: string[] = [];
  for (let chart in this.config.charts) {
    this.chartsConfig[chart] = {};
    for (let i = 0; i < this.config.charts[chart].data.length; i++) {
      let command = this.config.charts[chart].data[i];

      const { stdout } = await Logger.exec(command.cmd);
      ans.push(stdout.replace('\n', '').replace(',', ''));

    }
    if (Object.keys(this.config.charts[chart]).includes('bounds')) {
      this.chartsConfig[chart]['bounds'] = this.config.charts[chart].bounds;
    }
  }

  // If neofetch is installed, use neofetch
  try {
    let neofetch = (await Logger.exec(`neofetch --stdout`)).stdout
    this.fetch = neofetch;
  } catch (e) {
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