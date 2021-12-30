let oldlength = 0;
fetch('../temp.json').then(res => res.json()).then(x => {
  oldlength = x.length;
  main(x)
});
const chart = 'myChart1';
const charts = [];
function makeArray(n) {
  let ans = [];
  for (let i = 0; i < n; i++) {
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
      data: (n > 100) ? values.splice(values.length - 100, 100) : values
    }
    d.push(obj);
    i++;
  }
  let a = (n > 100) ? makeArray(100) : makeArray(n);

  const data = {
    labels: a,
    datasets: d
  };
  return data;
}

function addData(chart, label, data) {
  console.log(chart.data.datasets)
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data.push(data[i]);
  });

}

function main(json) {
  window.piapi = json;

  let i = 0;
  console.log(json)
  for (let chart in json.data) {
    const data = init(json.data[chart], json.length);
    console.log(data)
    const config = {
      type: 'line',
      data: data,
      options: {}
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
    if (json.length > oldlength && json.length <= 100) {
      let j = 0;
      for (let chart in json.data) {
        let values = [];

        for (let line in json.data[chart]) {
          let l = json.data[chart][line];
          values.push(l[l.length - 1])
        }
        console.log(values);
        addData(charts[j], json.length, values)
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

