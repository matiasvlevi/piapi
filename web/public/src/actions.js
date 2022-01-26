function hideHeader() {
  document.querySelector('header').style.display = 'none';
}

let fs = false;

function fullscreenMode() {

  fs = !fs;
  let i = (fs) ? 1 : 0;
  if (fs) {
    document.querySelector('.container').classList.remove('fs');
  } else {
    document.querySelector('.container').classList.add('fs');
  }
  // document.querySelector(".container").style.flexGrow = i;


}