const isMobile = (window.innerWidth < 1000)

let oldlength = 0;
fetch('../temp.json').then(res => res.json()).then(x => {
  oldlength = x.length;
  main(x)
});

const max = 100;
const chart = 'myChart1';
const charts = [];
function makeArray(n, freq = 5000) {
  let ans = [];
  let maxtime = freq * n;
  for (let i = 0; i < n; i++) {
    let v = ((maxtime) - ((i * freq))) / 1000;
    if (i / 5 === Math.floor(i / 5)) {
      ans.push(`-${v} sec`)
    } else {
      ans.push(`-${v} sec`)
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

function updateLabels(chart, n) {
  chart.data.labels = makeArray(n);
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
  canvasplot.setAttribute('class', 'chart');

  // Canvas container
  let plot = document.createElement('div');
  plot.setAttribute('class', 'plot');

  if (isMobile) {
    plot.setAttribute('style', 'width:100%;');
    graphContainer.setAttribute('style', 'width:100%;');
  }

  // Combine all elements
  plot.appendChild(canvasplot);
  graphContainer.appendChild(titleContainer);
  graphContainer.appendChild(plot);


  // Apply
  document.getElementById('chartsGrid').appendChild(graphContainer);

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
    let chrt = json.data[chart];

    const data = init(chrt.data, json.length);

    let pointSize = (chrt.pointSize !== undefined) ? chrt.pointSize : 2;
    let pointRadius = (chrt.responsivePointSize) ? responsivePointSize(json.length, max, i) : pointSize
    let pointHoverRadius = chrt.pointHoverRadius || 4;
    let opt = {
      pointRadius,
      pointHoverRadius,
      maintainAspectRatio: true
    };
    if (Object.keys(chrt).includes('bounds')) {
      let bounds = chrt['bounds'];
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
  // Resize plots
  if (window.innerWidth < 1000) {
    document.querySelector('#chartsGrid').style = 'width: 100%;margin:0px;'
    document.querySelector('main').style = 'width:98%;margin:0px';
    document.querySelectorAll('#chartsGrid > .container').forEach(elem => {
      elem.style.width = `100%`
      elem.style.height = '50%';
    });
    document.querySelectorAll('.plot').forEach(elem => {
      elem.style.width = `100%`;
      elem.style.height = '100%';
    });
  }
  setTimeout(UpdateGraph, 500);
}

function setValue(i, key, v) {
  charts[i].config._config.options[key] = v;
}

function mapSteps(minSize, maxSize, x, total) {
  let c = (-minSize) + maxSize + 1;
  let size = maxSize - Math.floor((c * x) / total);
  return size;
}

function responsivePointSize(length, max) {
  let len = (length > max) ? max : length;
  let size = mapSteps(2, 6, len, max);
  return size;
}

function setPointSize(size, i) {
  console.log('Size', size)
  charts[i].config._config.options.pointRadius = size;
}

// UpdateGraph
function UpdateGraph() {

  fetch('../len.json').then(res => res.json()).then(ign => {
    console.log(ign)
    if (ign.length > oldlength) {
      fetch('../temp.json').then(res => res.json()).then(json => {
        window.serverfetch = json;
        loadNeofetch(json.fetch);
        if (json.length > oldlength) {
          let j = 0;
          for (let chart in json.data) {
            let chrt = json.data[chart];
            let values = [];
            let keys = Object.keys(chrt.data);
            for (let i = 0; i < keys.length; i++) {
              let l = chrt.data[keys[i]];
              values.push(l[l.length - 1])
            }

            let pointSize = (chrt.pointSize !== undefined) ? chrt.pointSize : 2;
            let pointRadius = (chrt.responsivePointSize) ? responsivePointSize(json.length, max, j) : pointSize
            let pointHoverRadius = chrt.pointHoverRadius || 4;

            setValue(j, 'pointRadius', pointRadius)
            setValue(j, 'pointHoverRadius', pointHoverRadius)

            setPointSize(responsivePointSize(json.length, max), j);

            let currentLabelsLength = charts[j].data.datasets[0].data.length;

            if (json.length <= max) {
              updateLabels(charts[j], (currentLabelsLength > max) ? max : currentLabelsLength);
            }
            addData(charts[j], values);
            if (json.length > max) {
              removeData(charts[j]);
            }
            charts[j].update();
            j++;
          }
          console.log('Updating...');
          oldlength = ign.length;
        }
        setTimeout(UpdateGraph, 500);
      });
    } else {
      setTimeout(UpdateGraph, 500);
    }
  })
}

