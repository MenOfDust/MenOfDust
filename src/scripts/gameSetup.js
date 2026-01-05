

// Make the DIV element draggable:

import { initModal } from "./ui/modal.js";
import { initCharts, updateCharts } from "./ui/netChart.js";
import {projectedNextTurnValues} from "./campaign/turnSystem.js";
import { renderSidebar } from './ui/sidebar.js';
import { cities } from './campaign/cities.js';
import { simulateTurn, commitTurn} from './campaign/turnSystem.js';
import { showActiveGoals } from './ui/goalUI.js';
import { updateAllCityCharts } from './ui/cityCharts.js';
import { turnCounter } from './campaign/turnCounter.js';

  document.querySelectorAll('.dragBox').forEach(box => {
    makeDraggable(box);
  });

function makeDraggable(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    console.log("drag event is happening")
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


 
// setup next-turn button + modal
function wireNextTurnModal() {
  const nextTurnBtn = document.getElementById('nextTurnBtn');
  const modal = document.getElementById('confirmModal');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  nextTurnBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('show');
  });

  confirmNo.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
  });

  confirmYes.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
    // Run one global turn
    simulateTurn();
    //Actually save the changes
    commitTurn();  
    // Refresh UI after turn completes
    renderSidebar();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  initModal();
  renderSidebar();
  wireNextTurnModal();
  updateAllCityCharts();
  updateCharts();
  // Initialize turn counter
  turnCounter.initialize();
});


const choiceBox=document.getElementById("choiceBox");
const choiceBoxList=document.getElementById("choiceBoxList");
const resourceChart=document.getElementById('resourceChart');
 


// --- Listener Containment Zone ---

// These duplicate listeners have been removed to prevent multiple simulateTurn() calls
// The wireNextTurnModal() function handles all next turn logic properly

// UI helper functions

function clearChoices(e){
    const parent = e.currentTarget.parentElement;
    //kill the child, save the parent
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        } 
    const grandfather=parent.parentElement;
    grandfather.style.display = "none";
}

// Used to set or reset the initial positions of all the draggable elements.

function moveToVH(element, vh, customInnerHeight = window.innerHeight){
  if (!(element instanceof HTMLElement)) {
    console.error('moveToVH: attempting to move something that is not an HTML element');
    return;
  }

  const yPosition = customInnerHeight * (vh / 100);
  element.style.position = 'absolute';
  element.style.top = `${yPosition}px`;

}
