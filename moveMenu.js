// Variables 
const menu = document.querySelector('#boxMenu');
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
let menuLeft, menuTop;

let savePosX = localStorage.getItem('posXMenu');
let savePosY = localStorage.getItem('posYMenu');

// Events
window.addEventListener('load', function () {
    menu.style.top = savePosY.toString() + "px";
    menu.style.left = savePosX.toString() + "px"; 
})
menu.addEventListener('mousedown', mouseDown);

function mouseDown (e) {
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmousemove = mouseDrag;
  document.onmouseup = mouseUp; 
  menu.style.cursor = 'grabbing';
}

function mouseDrag (e) {
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  
  menu.style.top = (menu.offsetTop - pos2) + "px";
  menu.style.left = (menu.offsetLeft - pos1) + "px"; 
}

function mouseUp () {
  document.onmousemove = null;
  menu.style.cursor = 'grab';
 
  localStorage.setItem('posXMenu', menu.offsetLeft);
  localStorage.setItem('posYMenu', menu.offsetTop);
}
