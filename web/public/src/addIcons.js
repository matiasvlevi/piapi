

function addImage(name) {
  let path = `./assets/logos/${name}.svg`;
  let img = document.createElement('img');
  img.src = path;
  img.width = "100";
  img.style = "margin: 0px;"


  let div = document.createElement('div');
  let distroname = document.createElement('h3');
  distroname.textContent = name;
  div.style = "margin:1rem;width:fit-content;height:fit-content;flex-grow:1;";
  div.appendChild(distroname);
  div.appendChild(img);
  let grid = document.querySelector('.grid');
  grid.appendChild(div);
}

setTimeout(() => {
  for (let i = 0; i < DISTROS.length; i++) {
    addImage(DISTROS[i]);
  }
}, 1);