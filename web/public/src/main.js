fetch('../temp.json').then(res => res.json()).then(x => main(x));
const chart = 'myChart1';

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

function init(json) {
  let d = [];
  let i = 0;
  for (let log in json.data) {
    let clr = randomColor(i);
    let obj = {
      label: log,
      backgroundColor: clr,
      borderColor: clr,
      data: json.data[log],
    }
    d.push(obj);
    i++;
  }
  let a = makeArray(json.length)


  const data = {
    labels: a,
    datasets: d
  };
  return data;
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function main(json) {
  window.piapi = json;
  const data = init(json);

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  let canvas = document.getElementById(chart);
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  window.myChart = new Chart(
    canvas.getContext('2d'),
    config
  );
  setTimeout(f, 5000);
}

function f() {
  fetch('../temp.json').then(res => res.json()).then(json => {
    for (let log in json.data) {
      let values = json.data[log];
      addData(window.myChart, values.length - 1, values[values.length - 1])
      console.log(log, values[values.length - 1])
    }
    console.log('Updating...')
    setTimeout(f, 5000);
  });

}

