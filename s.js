let x = new Date().getTime();

console.log((Math.random() * 10 + (Math.random() * 5) * Math.sin(x)) * (x / 100000))