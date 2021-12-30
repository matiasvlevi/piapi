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
  return `rgb(${r},${g},${b})`
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

function addData(chart, label, data) {
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data.push(data[i]);
  });
}

function removeData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.splice(0, 1);
  });
}

function main(json) {
  window.piapi = json;

  let i = 0;
  for (let chart in json.data) {
    const data = init(json.data[chart], json.length);
    const config = {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
          }
        }
      }
    };
    let c = document.createElement('canvas');
    let p = document.createElement('div');
    let h = document.createElement('h2');
    h.textContent = chart;
    p.setAttribute('class', 'plot');
    c.setAttribute('id', `myChart${i}`);
    p.appendChild(h);
    p.appendChild(c);
    document.body.appendChild(p);

    let canvas = document.getElementById(`myChart${i}`);

    let chart_ = new Chart(
      canvas.getContext('2d'),
      config
    );

    chart_.canvas.parentNode.style.height = window.innerHeight / 2.4;
    chart_.canvas.parentNode.style.width = window.innerWidth / 2.4;
    charts.push(chart_);
    i++;
  }
  setTimeout(f, 3000);
}

function f() {
  fetch('../temp.json').then(res => res.json()).then(json => {
    if (json.length > oldlength) {
      let j = 0;
      for (let chart in json.data) {
        let values = [];

        for (let line in json.data[chart]) {
          let l = json.data[chart][line];
          values.push(l[l.length - 1])
        }
        addData(charts[j], json.length, values);

        if (json.length > max) {
          removeData(charts[j]);
        }
        j++;
      }
      charts.forEach(chart => {
        chart.update()
      });
      console.log('Updating...');
      oldlength = json.length;
    }
    setTimeout(f, 3000);
  });

}

