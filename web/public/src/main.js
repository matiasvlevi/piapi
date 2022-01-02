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
  // let t = 5;
  for (let i = 0; i < n; i++) {
    // let v = ((max * t)) - ((i * t));
    // if (i / 5 === Math.floor(i / 5)) {
    //   ans.push(`-${v} sec`)
    // } else {
    //   ans.push(``)
    // }
    ans.push(i)

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
  let a = (n > max) ? makeArray(max) : makeArray(n);

  const data = {
    labels: a,
    datasets: d
  };
  return data;
}

function downloadFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function loadLogo(os) {
  let path = `https://raw.githubusercontent.com/matiasvlevi/serverfetch/main/web/public/assets/logos/${os.toLocaleLowerCase()}.svg`;
  let logo = document.getElementById('distrologo');
  logo.src = path;
  logo.style = 'display:auto';
}

function addData(chart, data) {
  chart.data.datasets.labels = makeArray(data.length);
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


function download(chart) {
  let stream = [];
  for (let k = 0; k < serverfetch.length; k++) {
    let row = [];
    Object.values(serverfetch.data[chart].data).forEach((dataset) => {
      row.push(dataset[k]);
    });

    stream.push(row.join(','));
  }
  let header = Object.keys(serverfetch.data[chart].data).join(',');
  let file = `${header}\n${stream.join('\n')}`;
  let d = new Date();
  downloadFile(`${chart.replaceAll(' ', '_')}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`, file);
}

function addDomGraph(chart, i, config) {

  let chartName = `chart${i}`

  // Card container
  let graphContainer = document.createElement('div');
  graphContainer.setAttribute('class', 'container');

  // Title wrapper
  let titleContainer = document.createElement('div');
  titleContainer.setAttribute('id', 'cardTitleWrap');

  // Title
  let chartTitle = document.createElement('h3');
  chartTitle.textContent = chart;

  // Download button
  let downloadButton = document.createElement('button');

  downloadButton.setAttribute('id', 'downloadButton');
  downloadButton.setAttribute('onClick', `download("${chart}")`);

  // Apply
  titleContainer.appendChild(chartTitle);
  titleContainer.appendChild(downloadButton);

  // Canvas
  let canvasplot = document.createElement('canvas');
  canvasplot.setAttribute('id', chartName);

  // Canvas container
  let plot = document.createElement('div');
  plot.setAttribute('class', 'plot');

  // Combine all elements
  plot.appendChild(canvasplot);
  graphContainer.appendChild(titleContainer);
  graphContainer.appendChild(plot);

  // Apply
  document.querySelector('.grid').appendChild(graphContainer);

  // Create graph instance
  let chart_ = new Chart(
    canvasplot.getContext('2d'),
    config
  );
  // Push to chart instance references
  charts.push(chart_);
}

function main(json) {


  // Load device info
  loadNeofetch(json.fetch);
  let os = getOS(json.fetch);
  loadLogo(os);

  // Save data as global value for debugging
  window.serverfetch = json;

  let i = 0;
  for (let chart in json.data) {
    const data = init(json.data[chart].data, json.length);
    let opt = {
      pointRadius: 1,
      pointHoverRadius: 1,
      maintainAspectRatio: true
    };
    if (Object.keys(json.data[chart]).includes('bounds')) {
      let bounds = json.data[chart]['bounds'];
      console.log(bounds)
      opt['scales'] = {
        y: {
          suggestedMin: bounds[0],
          suggestedMax: bounds[1]
        }
      };
    }
    const config = {
      type: 'line',
      data: data,
      options: opt
    };

    addDomGraph(chart, i, config);
    i++;
  }
  setTimeout(UpdateGraph, 5000);
}


// UpdateGraph
function UpdateGraph() {
  fetch('../temp.json').then(res => res.json()).then(json => {
    window.serverfetch = json;
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

