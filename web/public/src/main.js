let oldlength = 0;
fetch('../temp.json').then(res => res.json()).then(x => {
  oldlength = x.length;
  main(x)
});

const max = 100;
const chart = 'myChart1';
const charts = [];
function makeArray(n) {
  let ans = [];
  let t = 5;
  for (let i = 0; i < n; i++) {
    let v = ((max * t)) - ((i * t));
    if (i / 5 === Math.floor(i / 5)) {
      ans.push(`-${v} sec`)
    } else {
      ans.push(``)
    }

  }
  return ans;
}

function randomColor(i) {
  let r = Math.random() * 155;
  let g = Math.random() * 155;
  let b = Math.random() * 155;
  let c = [r, g, b];
  c[i % 3] -= Math.random() * 100 + 155;
  c[i % 3] = Math.abs(c[i % 3]);
  return `rgba(${r},${g},${b})`
}

function init(chartData, n) {
  let d = [];
  let i = 0;
  for (let log in chartData) {
    let clr = randomColor(i);
    let values = chartData[log];
    let obj = {
      label: log,
      backgroundColor: clr,
      borderColor: clr,
      color: `#fff`,
      data: (n > max) ? values.splice(values.length - max, max) : values
    }
    d.push(obj);
    i++;
  }
  let a = makeArray(max)

  const data = {
    labels: a,
    datasets: d
  };
  return data;
}

function loadLogo(os) {
  let path = `./assets/logos/${os.toLocaleLowerCase()}.svg`;
  let logo = document.getElementById('distrologo');
  logo.src = path;
  logo.style = 'display:auto';
}

function addData(chart, data) {
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data.push(data[i]);
  });
}

function removeData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.splice(0, 1);
  });
}

function getOS(neofetchstr) {
  let line = neofetchstr.match(/OS:.*/gm)[0].toLocaleLowerCase();
  line = line.replace('linux ', '');
  line = line.replace(' MATE', 'mate')
  let osname = line.split(' ')[1];
  if (osname.includes('/')) {
    osname = osname.split('/')[0];
  }
  return osname;
}

function loadNeofetch(neofetch) {
  document.getElementById('neofetchBlock').textContent = neofetch;
}

function main(json) {


  loadNeofetch(json.fetch);
  let os = getOS(json.fetch);
  loadLogo(os);

  window.piapi = json;

  let i = 0;
  for (let chart in json.data) {
    const data = init(json.data[chart].data, json.length);

    // TODO : Replace 'bounds' with a variable key, which iterates through all the desired keys. Also add a conversion between keys ex:(bounds, scale)
    let opt = {
      // responsive: false,
      // maintainAspectRatio: false
    };
    if (Object.keys(json.data[chart]).includes('bounds')) {
      let bounds = json.data[chart]['bounds'];
      console.log(bounds)
      opt['scale'] = {
        x: bounds[0],
        y: bounds[1]
      };
    }
    const config = {
      type: 'line',
      data: data,
      options: opt
    };

    let graphContainer = document.createElement('div');
    graphContainer.setAttribute('class', 'container');

    let chartTitle = document.createElement('h3');
    chartTitle.textContent = chart;

    let chartName = `chart${i}`;
    let canvasplot = document.createElement('canvas');
    let plot = document.createElement('div');

    plot.setAttribute('class', 'plot');
    canvasplot.setAttribute('id', `chart${i}`);
    plot.appendChild(canvasplot);
    graphContainer.appendChild(chartTitle);
    graphContainer.appendChild(plot);
    document.querySelector('.grid').appendChild(graphContainer);

    let canvas = document.getElementById(chartName);

    let chart_ = new Chart(
      canvas.getContext('2d'),
      config
    );

    charts.push(chart_);
    i++;
  }
  setTimeout(UpdateGraph, 5000);
}


// UpdateGraph
function UpdateGraph() {
  fetch('../temp.json').then(res => res.json()).then(json => {
    loadNeofetch(json.fetch);
    if (json.length > oldlength) {
      let j = 0;
      for (let chart in json.data) {
        let values = [];
        let keys = Object.keys(json.data[chart].data);
        for (let i = 0; i < keys.length; i++) {
          let l = json.data[chart].data[keys[i]];
          values.push(l[l.length - 1])
        }
        //console.log(values)
        addData(charts[j], values);
        if (json.length > max) {
          removeData(charts[j]);
        }
        j++;
      }
      charts.forEach((chart) => {
        chart.update()
      });
      console.log('Updating...');
      oldlength = json.length;
    }
    setTimeout(UpdateGraph, 5000);
  });

}

